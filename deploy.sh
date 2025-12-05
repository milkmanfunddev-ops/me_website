#!/bin/bash
# Quick deployment script for Mealvana Endurance WordPress
# Usage: ./deploy.sh [with-ssh]

set -e

STACK_NAME="mealvana-endurance-wordpress"
REGION="us-east-1"
DOMAIN="endurance.mealvana.io"
DB_PASSWORD="Samwyse6553426t"

cd "$(dirname "$0")"

echo "=== Deploying Mealvana Endurance WordPress Stack ==="
echo "Stack Name: $STACK_NAME"
echo "Region: $REGION"
echo "Domain: $DOMAIN"
echo ""

# Validate template first
echo "Validating CloudFormation template..."
aws cloudformation validate-template \
    --template-body file://cloudformation.yaml \
    --region $REGION > /dev/null

echo "Template is valid."
echo ""

# Check if we should create SSH key
if [ "$1" == "with-ssh" ]; then
    KEY_NAME="mealvana-wordpress-key"
    KEY_FILE="${KEY_NAME}.pem"

    # Check if key already exists
    if aws ec2 describe-key-pairs --key-names $KEY_NAME --region $REGION 2>/dev/null; then
        echo "Key pair $KEY_NAME already exists."
    else
        echo "Creating SSH key pair..."
        aws ec2 create-key-pair \
            --key-name $KEY_NAME \
            --query 'KeyMaterial' \
            --output text \
            --region $REGION > $KEY_FILE
        chmod 400 $KEY_FILE
        echo "SSH key saved to $KEY_FILE"
    fi

    # Deploy with key pair
    echo "Creating stack with SSH access..."
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://cloudformation.yaml \
        --parameters \
            ParameterKey=DBPassword,ParameterValue="$DB_PASSWORD" \
            ParameterKey=DomainName,ParameterValue="$DOMAIN" \
            ParameterKey=KeyPairName,ParameterValue="$KEY_NAME" \
        --capabilities CAPABILITY_NAMED_IAM \
        --region $REGION
else
    # Deploy without key pair
    echo "Creating stack without SSH access (use SSM for access)..."
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://cloudformation.yaml \
        --parameters \
            ParameterKey=DBPassword,ParameterValue="$DB_PASSWORD" \
            ParameterKey=DomainName,ParameterValue="$DOMAIN" \
        --capabilities CAPABILITY_NAMED_IAM \
        --region $REGION
fi

echo ""
echo "Stack creation initiated!"
echo ""
echo "Monitor progress with:"
echo "  aws cloudformation describe-stack-events --stack-name $STACK_NAME --region $REGION"
echo ""
echo "Or wait for completion with:"
echo "  aws cloudformation wait stack-create-complete --stack-name $STACK_NAME --region $REGION"
echo ""
echo "This will take approximately 10-15 minutes..."
echo ""

# Wait for stack creation
echo "Waiting for stack creation to complete..."
aws cloudformation wait stack-create-complete --stack-name $STACK_NAME --region $REGION

echo ""
echo "=== Stack Created Successfully! ==="
echo ""

# Get outputs
echo "Stack Outputs:"
aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
    --output table

echo ""
echo "=== Next Steps ==="
echo "1. Visit the WebsiteURL to complete WordPress setup"
echo "2. Configure DNS in Squarespace (A record: endurance -> ElasticIP)"
echo "3. Wait for DNS propagation (5-30 minutes)"
echo "4. Run SSL setup script on the server"
echo "5. Install Hello Elementor theme and Elementor plugin"
