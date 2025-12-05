#!/bin/bash
# Fix wp-config.php - security keys must be BEFORE wp-settings.php is loaded

cat > /var/www/html/wp-config.php << 'WPEOF'
<?php
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wordpress_admin' );
define( 'DB_PASSWORD', 'Samwyse6553426t' );
define( 'DB_HOST', 'production-wordpress-db.cospod68monp.us-east-1.rds.amazonaws.com' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

define('AUTH_KEY',         'xK8h!Jq2mP9nL4vR7tY0wZ3aB6cD5eFgHiJkLmNoPqRsTuVwXyZ');
define('SECURE_AUTH_KEY',  'gH1iJ2kL3mN4oP5qR6sT7uV8wX9yZ0aBcDeFgHiJkLmNoPqRsT');
define('LOGGED_IN_KEY',    'cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0wXyZaBcDeFgHiJkLmNoP');
define('NONCE_KEY',        'yZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sTuVwXyZaBcDeFgHiJkL');
define('AUTH_SALT',        'uV1wX2yZ3aB4cD5eF6gH7iJ8kL9mN0oPqRsTuVwXyZaBcDeFgH');
define('SECURE_AUTH_SALT', 'qR1sT2uV3wX4yZ5aB6cD7eF8gH9iJ0kLmNoPqRsTuVwXyZaBcD');
define('LOGGED_IN_SALT',   'mN1oP2qR3sT4uV5wX6yZ7aB8cD9eF0gHiJkLmNoPqRsTuVwXyZ');
define('NONCE_SALT',       'iJ1kL2mN3oP4qR5sT6uV7wX8yZ9aB0cDeFgHiJkLmNoPqRsTuV');

$table_prefix = 'wp_';

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'FS_METHOD', 'direct' );

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}
require_once ABSPATH . 'wp-settings.php';
WPEOF

chown apache:apache /var/www/html/wp-config.php
chmod 644 /var/www/html/wp-config.php
systemctl restart httpd

echo "wp-config.php fixed!"
