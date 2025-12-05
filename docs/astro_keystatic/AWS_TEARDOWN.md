# AWS Infrastructure Teardown Checklist

## Complete Guide to Removing WordPress Infrastructure

---

## Current AWS Resources (As of December 2025)

The following resources were created by the CloudFormation stack `mealvana-endurance-wordpress`:

### Stack Information
- **Stack Name**: `mealvana-endurance-wordpress`
- **Region**: `us-east-1`
- **Status**: `CREATE_COMPLETE`

### Resources to Delete

| Resource Type | Logical ID | Physical ID | Monthly Cost |
|---------------|------------|-------------|--------------|
| EC2 Instance | WordPressInstance | `i-096475e5a9daac12c` | ~$8-10 |
| RDS Instance | RDSInstance | `production-wordpress-db` | ~$12-15 |
| Elastic IP | ElasticIP | `54.85.194.30` | ~$3.60 (if unused) |
| VPC | VPC | `vpc-09af0cb7a258184df` | $0 |
| Internet Gateway | InternetGateway | `igw-0f97f38cd834723ae` | $0 |
| Security Groups | EC2SecurityGroup | `sg-005d3091a9dad6ff2` | $0 |
| Security Groups | RDSSecurityGroup | `sg-0fd1e3734bc56113d` | $0 |
| IAM Role | EC2Role | `production-wordpress-ec2-role` | $0 |
| IAM Instance Profile | EC2InstanceProfile | `production-wordpress-instance-profile` | $0 |
| DB Subnet Group | DBSubnetGroup | `mealvana-endurance-wordpress-dbsubnetgroup-vs3zo1n5oj8m` | $0 |
| Subnets (4) | PublicSubnet1, PublicSubnet2, PrivateSubnet1, PrivateSubnet2 | Various | $0 |
| Route Table | PublicRouteTable | `rtb-0eb629dac25f0e255` | $0 |

**Estimated Monthly Cost (After Free Tier)**: ~$20-30/month

---

## Pre-Teardown Checklist

**STOP! Before deleting anything, verify:**

- [ ] Astro site is live at `endurance.mealvana.io`
- [ ] DNS has fully propagated (test with `dig endurance.mealvana.io`)
- [ ] SSL/HTTPS is working on Vercel
- [ ] All blog posts are migrated and accessible
- [ ] Keystatic CMS is functioning
- [ ] You have waited at least 24 hours since DNS change
- [ ] You have downloaded any content/images from WordPress you still need

### Verify DNS Propagation
```bash
# Check DNS resolution
dig endurance.mealvana.io

# Should return Vercel's IP or CNAME, NOT 54.85.194.30
# If it still shows 54.85.194.30, wait longer before proceeding
```

### Final WordPress Backup (Optional)
```bash
# SSH into EC2 and create database backup
aws ssm start-session --target i-096475e5a9daac12c --region us-east-1

# Inside the session:
sudo mysqldump -h production-wordpress-db.cospod68monp.us-east-1.rds.amazonaws.com \
  -u wordpress_admin -p wordpress > /tmp/wordpress_backup.sql

# Download backup locally using S3 or SCP
```

---

## Teardown Option 1: Delete CloudFormation Stack (Recommended)

**This is the cleanest approach - deletes everything at once.**

### Step 1: Verify Stack Exists
```bash
aws cloudformation describe-stacks \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 \
  --query 'Stacks[0].StackStatus'
```

### Step 2: Delete the Stack
```bash
aws cloudformation delete-stack \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1
```

### Step 3: Monitor Deletion Progress
```bash
# Watch the deletion progress
aws cloudformation describe-stack-events \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 \
  --query 'StackEvents[*].{Time:Timestamp,Resource:LogicalResourceId,Status:ResourceStatus}' \
  --output table

# Or wait for completion
aws cloudformation wait stack-delete-complete \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1
```

### Step 4: Verify Deletion
```bash
# Should return an error saying stack doesn't exist
aws cloudformation describe-stacks \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1

# Expected: "Stack with id mealvana-endurance-wordpress does not exist"
```

### Troubleshooting Stack Deletion

If deletion fails (common reasons):

**RDS Deletion Protection Enabled:**
```bash
# Disable deletion protection first
aws rds modify-db-instance \
  --db-instance-identifier production-wordpress-db \
  --no-deletion-protection \
  --region us-east-1

# Then retry stack deletion
aws cloudformation delete-stack \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1
```

**EC2 Instance Termination Protection:**
```bash
# Disable termination protection
aws ec2 modify-instance-attribute \
  --instance-id i-096475e5a9daac12c \
  --no-disable-api-termination \
  --region us-east-1
```

---

## Teardown Option 2: Manual Resource Deletion

If CloudFormation deletion fails, delete resources manually in this order:

### Step 1: Stop and Terminate EC2 Instance
```bash
# Stop the instance first
aws ec2 stop-instances \
  --instance-ids i-096475e5a9daac12c \
  --region us-east-1

# Wait for it to stop
aws ec2 wait instance-stopped \
  --instance-ids i-096475e5a9daac12c \
  --region us-east-1

# Terminate the instance
aws ec2 terminate-instances \
  --instance-ids i-096475e5a9daac12c \
  --region us-east-1

# Wait for termination
aws ec2 wait instance-terminated \
  --instance-ids i-096475e5a9daac12c \
  --region us-east-1
```

### Step 2: Delete RDS Instance
```bash
# Delete RDS (skip final snapshot to avoid storage costs)
aws rds delete-db-instance \
  --db-instance-identifier production-wordpress-db \
  --skip-final-snapshot \
  --region us-east-1

# Wait for deletion (takes 5-10 minutes)
aws rds wait db-instance-deleted \
  --db-instance-identifier production-wordpress-db \
  --region us-east-1
```

### Step 3: Release Elastic IP
```bash
# Get the allocation ID
aws ec2 describe-addresses \
  --public-ips 54.85.194.30 \
  --region us-east-1 \
  --query 'Addresses[0].AllocationId' \
  --output text

# Release the Elastic IP (replace with actual allocation ID)
aws ec2 release-address \
  --allocation-id <ALLOCATION_ID> \
  --region us-east-1
```

### Step 4: Delete DB Subnet Group
```bash
aws rds delete-db-subnet-group \
  --db-subnet-group-name mealvana-endurance-wordpress-dbsubnetgroup-vs3zo1n5oj8m \
  --region us-east-1
```

### Step 5: Delete Security Groups
```bash
# Delete RDS security group
aws ec2 delete-security-group \
  --group-id sg-0fd1e3734bc56113d \
  --region us-east-1

# Delete EC2 security group
aws ec2 delete-security-group \
  --group-id sg-005d3091a9dad6ff2 \
  --region us-east-1
```

### Step 6: Delete Subnets
```bash
# Delete all subnets
aws ec2 delete-subnet --subnet-id subnet-0db12d96a5b48a70c --region us-east-1
aws ec2 delete-subnet --subnet-id subnet-0486dce33094eecad --region us-east-1
aws ec2 delete-subnet --subnet-id subnet-09dca2abb83e5b4ac --region us-east-1
aws ec2 delete-subnet --subnet-id subnet-0a983fb3a3b7a5b1e --region us-east-1
```

### Step 7: Delete Route Table
```bash
# Disassociate routes first (if needed)
aws ec2 delete-route-table \
  --route-table-id rtb-0eb629dac25f0e255 \
  --region us-east-1
```

### Step 8: Detach and Delete Internet Gateway
```bash
# Detach from VPC
aws ec2 detach-internet-gateway \
  --internet-gateway-id igw-0f97f38cd834723ae \
  --vpc-id vpc-09af0cb7a258184df \
  --region us-east-1

# Delete internet gateway
aws ec2 delete-internet-gateway \
  --internet-gateway-id igw-0f97f38cd834723ae \
  --region us-east-1
```

### Step 9: Delete VPC
```bash
aws ec2 delete-vpc \
  --vpc-id vpc-09af0cb7a258184df \
  --region us-east-1
```

### Step 10: Delete IAM Role and Instance Profile
```bash
# Remove role from instance profile
aws iam remove-role-from-instance-profile \
  --instance-profile-name production-wordpress-instance-profile \
  --role-name production-wordpress-ec2-role

# Delete instance profile
aws iam delete-instance-profile \
  --instance-profile-name production-wordpress-instance-profile

# Detach policies from role
aws iam detach-role-policy \
  --role-name production-wordpress-ec2-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# Delete role
aws iam delete-role \
  --role-name production-wordpress-ec2-role
```

---

## Post-Deletion Verification

### Verify All Resources Deleted
```bash
# Check EC2 instances
aws ec2 describe-instances \
  --filters "Name=tag:aws:cloudformation:stack-name,Values=mealvana-endurance-wordpress" \
  --region us-east-1

# Check RDS instances
aws rds describe-db-instances \
  --db-instance-identifier production-wordpress-db \
  --region us-east-1

# Check Elastic IPs
aws ec2 describe-addresses \
  --public-ips 54.85.194.30 \
  --region us-east-1

# Check VPCs
aws ec2 describe-vpcs \
  --vpc-ids vpc-09af0cb7a258184df \
  --region us-east-1

# All should return errors or empty results
```

### Verify Billing
After 24-48 hours:
1. Go to AWS Console → Billing Dashboard
2. Check "Cost Explorer"
3. Verify no charges for deleted resources

---

## Resources NOT Deleted by This Process

These remain in your AWS account (and are free or minimal cost):

| Resource | Reason to Keep |
|----------|----------------|
| AWS Account | You may need it for other projects |
| IAM User (Xuan) | For future AWS access |
| Default VPC | AWS default, can't delete easily |
| CloudWatch Logs | May contain useful logs (auto-expire) |

### Optional Cleanup
```bash
# Delete CloudWatch log groups (optional)
aws logs delete-log-group \
  --log-group-name /var/log/wordpress \
  --region us-east-1
```

---

## Quick Reference: One-Command Teardown

If you're confident and want to delete everything at once:

```bash
# THE NUCLEAR OPTION - Deletes everything
# Only run this after verifying Vercel site is working!

aws cloudformation delete-stack \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 && \
aws cloudformation wait stack-delete-complete \
  --stack-name mealvana-endurance-wordpress \
  --region us-east-1 && \
echo "Stack deleted successfully!"
```

---

## Rollback Instructions

If you need to restore WordPress:

### Quick Restore (Within 7 days of RDS deletion)
RDS creates automatic snapshots. Check if one exists:
```bash
aws rds describe-db-snapshots \
  --db-instance-identifier production-wordpress-db \
  --region us-east-1
```

### Full Restore (Using CloudFormation)
```bash
# Redeploy using the saved template
cd /Users/leemartin/development/me_website

aws cloudformation create-stack \
  --stack-name mealvana-endurance-wordpress \
  --template-body file://cloudformation.yaml \
  --parameters ParameterKey=DBPassword,ParameterValue=YourNewPassword \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

---

## Estimated Savings

| Resource | Monthly Cost | Annual Savings |
|----------|--------------|----------------|
| EC2 t2.micro | $8.50 | $102 |
| RDS db.t3.micro | $12.50 | $150 |
| Elastic IP (unused) | $3.60 | $43 |
| Data Transfer | ~$1-5 | ~$12-60 |
| **Total** | **~$25-30** | **~$300-360** |

**Note**: Free tier covers first 12 months. After that, these costs apply.

---

## Summary Checklist

- [ ] Verified Astro site is live and working
- [ ] Verified DNS points to Vercel, not AWS
- [ ] Waited 24+ hours after DNS change
- [ ] Created WordPress backup (optional)
- [ ] Deleted CloudFormation stack
- [ ] Verified all resources deleted
- [ ] Checked AWS billing dashboard
- [ ] Updated documentation

**Congratulations! Your AWS WordPress infrastructure is now decommissioned.**
