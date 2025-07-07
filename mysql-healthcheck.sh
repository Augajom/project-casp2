#!/bin/sh
mysqladmin ping -h localhost -u root -p${MYSQL_ROOT_PASSWORD}
# อย่าลืม chmod +x mysql-healthcheck.sh เพื่อให้สิทธิ์ไฟล์ให้เป็น executable