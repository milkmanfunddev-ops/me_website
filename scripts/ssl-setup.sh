#!/bin/bash
# SSL Certificate Setup Script for Mealvana Endurance WordPress
# Run this script on the EC2 instance after DNS is configured

set -e

DOMAIN="${1:-endurance.mealvana.io}"
EMAIL="${2:-}"

echo "=== SSL Certificate Setup for $DOMAIN ==="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root (use sudo)"
    exit 1
fi

# Check if domain resolves to this server
echo "Checking DNS resolution..."
SERVER_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
DOMAIN_IP=$(dig +short $DOMAIN | tail -1)

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    echo "WARNING: Domain $DOMAIN resolves to $DOMAIN_IP but this server is $SERVER_IP"
    echo "Make sure DNS is properly configured before continuing."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install EPEL repository
echo "Installing EPEL repository..."
amazon-linux-extras install epel -y

# Install Certbot
echo "Installing Certbot..."
yum install certbot python-certbot-apache -y

# Get certificate
echo "Obtaining SSL certificate..."
if [ -z "$EMAIL" ]; then
    certbot --apache -d $DOMAIN --register-unsafely-without-email --agree-tos --redirect
else
    certbot --apache -d $DOMAIN --email $EMAIL --agree-tos --redirect
fi

# Test auto-renewal
echo "Testing auto-renewal..."
certbot renew --dry-run

# Create renewal cron job
echo "Setting up auto-renewal cron job..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

echo ""
echo "=== SSL Setup Complete ==="
echo "Your site is now accessible at https://$DOMAIN"
echo "Certificates will auto-renew via cron job."
