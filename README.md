# Mealvana Endurance WordPress Site

AWS infrastructure for endurance.mealvana.io using CloudFormation with EC2 + RDS (Free Tier).

## Architecture

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                        VPC                               │
                    │                    10.0.0.0/16                           │
                    │                                                          │
   Internet ───────►│  ┌──────────────────┐      ┌──────────────────┐        │
                    │  │  Public Subnet 1  │      │  Public Subnet 2  │        │
                    │  │    10.0.1.0/24    │      │    10.0.2.0/24    │        │
                    │  │                   │      │                   │        │
                    │  │  ┌─────────────┐  │      │                   │        │
                    │  │  │ EC2 t2.micro│  │      │                   │        │
                    │  │  │  WordPress  │  │      │                   │        │
                    │  │  │  + Apache   │  │      │                   │        │
                    │  │  └──────┬──────┘  │      │                   │        │
                    │  └─────────┼─────────┘      └───────────────────┘        │
                    │            │                                              │
                    │            │ MySQL (3306)                                 │
                    │            ▼                                              │
                    │  ┌──────────────────┐      ┌──────────────────┐         │
                    │  │ Private Subnet 1 │      │ Private Subnet 2 │         │
                    │  │   10.0.3.0/24    │      │   10.0.4.0/24    │         │
                    │  │                  │      │                  │         │
                    │  │  ┌────────────┐  │      │                  │         │
                    │  │  │RDS t3.micro│  │      │                  │         │
                    │  │  │   MySQL    │  │      │                  │         │
                    │  │  └────────────┘  │      │                  │         │
                    │  └──────────────────┘      └──────────────────┘         │
                    └─────────────────────────────────────────────────────────┘
```

## Cost Estimate (Free Tier - First 12 Months)

| Resource | Free Tier Allowance | Expected Cost |
|----------|---------------------|---------------|
| EC2 t2.micro | 750 hrs/month | $0 |
| RDS db.t3.micro | 750 hrs/month | $0 |
| EBS Storage | 30 GB | $0 |
| RDS Storage | 20 GB | $0 |
| Elastic IP | Free when attached | $0 |
| Data Transfer | 15 GB out/month | $0 |
| **Total** | | **~$0/month** |

After 12 months: ~$15-25/month

## Prerequisites

1. AWS CLI installed and configured
2. AWS account with Free Tier eligibility
3. Access to Squarespace DNS settings for mealvana.io

## Deployment Steps

### Step 1: Validate Template (Optional)

```bash
aws cloudformation validate-template \
  --template-body file://cloudformation.yaml \
  --region us-east-1
```

### Step 2: Deploy the Stack

**Option A: Without SSH access (simpler, use SSM for access)**

```bash
aws cloudformation create-stack \
  --stack-name mealvana-endurance-wordpress \
  --template-body file://cloudformation.yaml \
  --parameters \
    ParameterKey=DBPassword,ParameterValue='LM@work123' \
    ParameterKey=DomainName,ParameterValue='endurance.mealvana.io' \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

**Option B: With SSH access (need to create key pair first)**

```bash
# First, create a key pair
aws ec2 create-key-pair \
  --key-name mealvana-wordpress-key \
  --query 'KeyMaterial' \
  --output text \
  --region us-east-1 > mealvana-wordpress-key.pem

chmod 400 mealvana-wordpress-key.pem

# Then deploy with the key pair
aws cloudformation create-stack \
  --stack-name mealvana-endurance-wordpress \
  --template-body file://cloudformation.yaml \
  --parameters \
    ParameterKey=DBPassword,ParameterValue='LM@work123' \
    ParameterKey=DomainName,ParameterValue='endurance.mealvana.io' \
    ParameterKey=KeyPairName,ParameterValue='mealvana-wordpress-key' \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

### Step 3: Monitor Deployment

```bash
# Watch stack creation (takes 10-15 minutes)
aws cloudformation describe-stacks \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 \
  --query 'Stacks[0].StackStatus'

# Or watch events
aws cloudformation describe-stack-events \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 \
  --query 'StackEvents[*].[Timestamp,ResourceStatus,ResourceType,ResourceStatusReason]' \
  --output table
```

### Step 4: Get Outputs

```bash
aws cloudformation describe-stacks \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'
```

This will show you:
- **WebsiteURL**: The IP to visit for WordPress setup
- **ElasticIP**: The IP to configure in DNS
- **SSHCommand**: How to SSH into the server (if key pair provided)

### Step 5: Complete WordPress Setup

1. Open the WebsiteURL in your browser (http://YOUR_ELASTIC_IP)
2. Select your language
3. Create your admin account:
   - Site Title: `Mealvana Endurance`
   - Username: (choose something secure, not 'admin')
   - Password: (use a strong password)
   - Email: your email
4. Click "Install WordPress"

### Step 6: Configure DNS (Squarespace)

1. Log into Squarespace
2. Go to **Settings > Domains > mealvana.io > DNS Settings**
3. Add a new record:
   - Type: `A`
   - Host: `endurance`
   - Data: `YOUR_ELASTIC_IP` (from Step 4)
   - TTL: `3600` (or default)
4. Save and wait 5-30 minutes for propagation

### Step 7: Install SSL Certificate (Let's Encrypt)

SSH into your server (or use AWS Systems Manager Session Manager):

```bash
# Connect via SSH (if you created a key pair)
ssh -i mealvana-wordpress-key.pem ec2-user@YOUR_ELASTIC_IP

# Or use SSM Session Manager from AWS Console
```

Then run:

```bash
# Install Certbot
sudo amazon-linux-extras install epel -y
sudo yum install certbot python-certbot-apache -y

# Get certificate (replace with your domain)
sudo certbot --apache -d endurance.mealvana.io

# Follow prompts - enter email, agree to terms, choose redirect (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 8: Install Hello Elementor Theme

1. Log into WordPress admin (http://endurance.mealvana.io/wp-admin)
2. Go to **Appearance > Themes > Add New**
3. Search for "Hello Elementor"
4. Click **Install** then **Activate**

### Step 9: Install Elementor Plugin

1. Go to **Plugins > Add New**
2. Search for "Elementor"
3. Install "Elementor Website Builder"
4. Click **Activate**
5. Follow the Elementor setup wizard

## Useful Commands

### Check Stack Status
```bash
aws cloudformation describe-stacks \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1
```

### SSH into EC2
```bash
ssh -i mealvana-wordpress-key.pem ec2-user@YOUR_ELASTIC_IP
```

### View WordPress Logs
```bash
# Apache access log
sudo tail -f /var/log/httpd/access_log

# Apache error log
sudo tail -f /var/log/httpd/error_log

# WordPress debug log (if enabled)
sudo tail -f /var/www/html/wp-content/debug.log
```

### Restart Services
```bash
sudo systemctl restart httpd
sudo systemctl restart php-fpm
```

### Update WordPress via CLI
```bash
cd /var/www/html
sudo -u apache wp core update
sudo -u apache wp plugin update --all
sudo -u apache wp theme update --all
```

## Updating the Stack

To update infrastructure:

```bash
aws cloudformation update-stack \
  --stack-name mealvana-endurance-wordpress \
  --template-body file://cloudformation.yaml \
  --parameters \
    ParameterKey=DBPassword,UsePreviousValue=true \
    ParameterKey=DomainName,ParameterValue='endurance.mealvana.io' \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

## Deleting the Stack

**Warning**: This will delete all resources including your database!

```bash
# Delete the stack
aws cloudformation delete-stack \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1

# Monitor deletion
aws cloudformation describe-stacks \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1
```

Note: RDS will create a final snapshot before deletion (named `mealvana-endurance-wordpress-*`).

## Troubleshooting

### Stack Creation Failed

Check events for errors:
```bash
aws cloudformation describe-stack-events \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1
```

Common issues:
- **Service limit exceeded**: You may have hit Free Tier limits
- **Key pair not found**: Create the key pair first or remove the parameter

### Can't Connect to Website

1. Check security groups allow port 80/443
2. Verify EC2 instance is running
3. Check Apache status: `sudo systemctl status httpd`

### Database Connection Error

1. Verify RDS is running
2. Check security group allows EC2 to connect to RDS
3. Verify credentials in `/var/www/html/wp-config.php`

### User Data Script Failed

View the log:
```bash
sudo cat /var/log/user-data.log
```

## Security Recommendations

1. **Restrict SSH access**: Update security group to only allow your IP
2. **Use strong passwords**: For WordPress admin and database
3. **Enable WordPress security plugins**: Wordfence, Sucuri, or similar
4. **Keep updated**: Regularly update WordPress, themes, and plugins
5. **Enable backups**: Consider AWS Backup or WordPress backup plugins

## Files in This Directory

```
me_website/
├── README.md              # This file
├── cloudformation.yaml    # Main infrastructure template
└── scripts/
    └── ssl-setup.sh       # SSL certificate installation script
```
