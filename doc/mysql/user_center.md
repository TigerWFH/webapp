# 用户中心数据库设计<http://gglinux.com/2017/03/31/user/>

> https://www.modb.pro/db/174153
>
> 用户系统，主要分为账号体系和用户信息两大类。
>
> 账号体系包括：注册、登录验证、第三方授权以及权限管理
>
> 用户信息包括：用户属性、用户地理位置信息、用户设备信息以及用户日志信息

## MySql 数据类型

```SQL
    CREATE TABLE `commission_store_user_settle` (
        `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
        `gmt_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        `version` int(11) NOT NULL DEFAULT '0' COMMENT '版本号',
        `commission_user_id` bigint(20) NOT NULL COMMENT '店员用户ID',
        `user_id` bigint(20) NOT NULL COMMENT '扫码下单用户ID',
        `trade_id` varchar(64) NOT NULL COMMENT '订单id',
        `seller_id` bigint(20) NOT NULL COMMENT '商户ID',
        `store_id` bigint(20) NOT NULL COMMENT '门店ID',
        `order_date` datetime NOT NULL COMMENT '下单日期',
        `sku_id` bigint(20) NOT NULL COMMENT '商品规格渠道ID',
        `price` bigint(20) NOT NULL COMMENT '金额_支付金额',
        `item_count`  int(11) NOT NULL COMMENT '商品数量',
        `commission_status` tinyint(4) NOT NULL COMMENT '分佣状态 1:待分佣 2:已分佣 3:不分佣' ,
        `commission_type` tinyint(4) NOT NULL COMMENT '分佣类型 1:患者支付处方 2:买手商城' ,
        `commission_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '分佣金额，单位分',
        `commission_percent` int(11) NOT NULL DEFAULT '0' COMMENT '分佣比例',

        PRIMARY KEY (`id`),
        KEY `idx_trade_id` (`trade_id`) USING BTREE,
        KEY `idx_cms_user_id_cms_date` (`commission_user_id`,`order_date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='店员分佣结算表';
```

- `bigint(20)`
- `int(10)`
- `tinyint(1)`
- `datetime`
- `varchar`
- `char`
- ``
- ``

## SQL 关键字
- ``
- ``
- ``
## 登录授权表

```SQL
//用户授权表
CREATE TABLE `user_auth` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `identity_type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '1手机号 2邮箱 3用户名 4qq 5微信 6腾讯微博 7新浪微博',
  `identifier` varchar(50) NOT NULL DEFAULT '' COMMENT '手机号 邮箱 用户名或第三方应用的唯一标识',
  `certificate` varchar(20) NOT NULL DEFAULT '' COMMENT '密码凭证(站内的保存密码，站外的不保存或保存token)',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '绑定时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '更新绑定时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `only` (`uid`,`identity_type`),
  KEY `idx_uid` (`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户授权表'
```

## 用户信息分为用户基础信息表和用户信息扩展表

```SQL
//用户基础信息
CREATE TABLE `user_base` (
  `uid` bigint(20) NOT NULL COMMENT '用户ID',
  `user_role` tinyint(2) unsigned NOT NULL DEFAULT '2' COMMENT '2正常用户 3禁言用户 4虚拟用户 5运营',
  `register_source` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '注册来源：1手机号 2邮箱 3用户名 4qq 5微信 6腾讯微博 7新浪微博',
  `user_name` varchar(32) NOT NULL DEFAULT '' COMMENT '用户账号，必须唯一',
  `nick_name` varchar(32) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `gender` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '用户性别 0-female 1-male',
  `birthday` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户生日',
  `signature` varchar(255) NOT NULL DEFAULT '' COMMENT '用户个人签名',
  `mobile` varchar(16) NOT NULL DEFAULT '' COMMENT '手机号码(唯一)',
  `mobile_bind_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '手机号码绑定时间',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '邮箱(唯一)',
  `email_bind_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '邮箱绑定时间',
  `face` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `face200` varchar(255) NOT NULL DEFAULT '' COMMENT '头像 200x200x80',
  `srcface` varchar(255) NOT NULL DEFAULT '' COMMENT '原图头像',
  `create_time` int(11) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL COMMENT '修改时间',
  `push_token` varchar(50) NOT NULL COMMENT '用户设备push_token',
  PRIMARY KEY (`uid`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基础信息表'
//用户扩展信息
CREATE TABLE `user_extra` (
  `uid` bigint(20) NOT NULL COMMENT '用户 ID',
  `vendor` varchar(64) NOT NULL DEFAULT '' COMMENT '手机厂商：apple|htc|samsung，很少用',
  `client_name` varchar(50) NOT NULL DEFAULT '' COMMENT '客户端名称，如hjskang',
  `client_version` varchar(50) NOT NULL DEFAULT '' COMMENT '客户端版本号，如7.0.1',
  `os_name` varchar(16) NOT NULL DEFAULT '' COMMENT '设备号:android|ios',
  `os_version` varchar(16) NOT NULL DEFAULT '' COMMENT '系统版本号:2.2|2.3|4.0|5.1',
  `device_name` varchar(32) NOT NULL DEFAULT '' COMMENT '设备型号，如:iphone6s、u880、u8800',
  `device_id` varchar(128) NOT NULL DEFAULT '' COMMENT '设备ID',
  `idfa` varchar(50) NOT NULL DEFAULT '' COMMENT '苹果设备的IDFA',
  `idfv` varchar(50) NOT NULL DEFAULT '' COMMENT '苹果设备的IDFV',
  `market` varchar(20) NOT NULL DEFAULT '' COMMENT '来源',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `extend1` varchar(100) NOT NULL DEFAULT '' COMMENT '扩展字段1',
  `extend2` varchar(100) NOT NULL DEFAULT '' COMMENT '扩展字段2',
  `extend3` varchar(100) NOT NULL DEFAULT '' COMMENT '扩展字段3',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户额外信息表'
//用户位置信息
CREATE TABLE `user_location` (
  `uid` bigint(20) unsigned NOT NULL COMMENT '用户ID',
  `curr_nation` varchar(10) NOT NULL DEFAULT '' COMMENT '所在地国',
  `curr_province` varchar(10) NOT NULL DEFAULT '' COMMENT '所在地省',
  `curr_city` varchar(10) NOT NULL DEFAULT '' COMMENT '所在地市',
  `curr_district` varchar(20) NOT NULL DEFAULT '' COMMENT '所在地地区',
  `location` varchar(255) NOT NULL DEFAULT '' COMMENT '具体地址',
  `longitude` decimal(10,6) DEFAULT NULL COMMENT '经度',
  `latitude` decimal(10,6) DEFAULT NULL COMMENT '纬度',
  `update_time` int(11) unsigned DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户定位表'
```

## 用户日志信息

> 日志信息，用来保存用户注册或者登陆行为的。另外会有一些修改密码或者修改重要信息的日志记录。

```SQL
//用户登陆日志
CREATE TABLE `user_login_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户uid',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '登录方式 第三方/邮箱/手机等',
  `command` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '操作类型 1登陆成功  2登出成功 3登录失败 4登出失败',
  `version` varchar(32) NOT NULL DEFAULT '1.0' COMMENT '客户端版本号',
  `client` varchar(20) NOT NULL DEFAULT 'dabaozha' COMMENT '客户端',
  `device_id` varchar(64) NOT NULL DEFAULT '' COMMENT '登录时设备号',
  `lastip` varchar(32) NOT NULL DEFAULT '' COMMENT '登录ip',
  `os` varchar(16) NOT NULL DEFAULT '' COMMENT '手机系统',
  `osver` varchar(32) NOT NULL DEFAULT '' COMMENT '系统版本',
  `text` varchar(200) NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '操作时间',
  PRIMARY KEY (`id`),
  KEY `idx_uid_type_time` (`uid`,`type`,`create_time`) USING BTREE,
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='登陆日志表'

//用户注册日志
CREATE TABLE `user_register_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` bigint(20) unsigned NOT NULL COMMENT '用户ID',
  `register_method` tinyint(2) unsigned NOT NULL COMMENT '注册方式1手机号 2邮箱 3用户名 4qq 5微信 6腾讯微博 7新浪微博',
  `register_time` int(11) NOT NULL COMMENT '注册时间',
  `register_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '注册IP',
  `register_client` varchar(16) NOT NULL DEFAULT '' COMMENT '注册客户端',
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='用户注册日志表'

//修改信息日志
CREATE TABLE `user_info_update` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `uid` bigint(20) unsigned NOT NULL COMMENT '用户ID',
  `attribute_name` varchar(30) NOT NULL COMMENT '属性名',
  `attribute_old_val` varchar(30) NOT NULL DEFAULT '' COMMENT '属性对应旧的值',
  `attribute_new_val` varchar(30) NOT NULL DEFAULT '' COMMENT '属性对应新的值',
  `update_time` int(11) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='用户注册日志表'
```

## 全局 uid

> 建议不要使用表的主键作为用户 ID，而是使用 ID 生成器(发号器)生成用户的唯一标示 guid。当用户量急剧上升时，往往会采取分库分表的方法，然后通过将 uid 取余写到不同的表中。如果单纯的以某个表主键作为 ID。会限制插入性能和增加业务复杂度,其次在分布式数据库中也无法保证 ID 唯一性。
>
> 全局 ID 生成，是有很多方案的。简单一点，可以采用 redis 自增属性，因为其具有原子性，在分布式坏境中，能保证 ID 的唯一性。另外还有其他的一些开源方案，可自行 Google。

## Access Token

> 与传统的 Session 相比，Access Token 比较适合做 RESTful Api 开发。传统 Web 应用中，用户登陆后会写用户信息到 cookie 中，服务端通过 Session 就能得到用户的身份。
>
> Access Token 的是 OAuth2.0 中用户经过授权后，返回调用 API 的凭证。对于自己的应用来讲，用户在登录后，即返回 access_token。在 token 有效期内可凭借此凭证，调用其他接口。对于 access_token 的刷新有两种方案，第一种每次用户重启 app 时，重新 refresh。第二种，在调用周期内服务端发现 access token 可能过期时，返回新的 token 给客户端。
>
> 至于 Access Token 的生成，这个并没有规定，只要保证其唯一性即可。简单点，对用户 uid 和当前时间哈希得到新的 Access Token，并设置过期时间。另外也可以采用 JWT 实现。

## MYSQL 导入文本文件 txt

```js
/*
使用命令：LOAD DATA LOCAL INFILE '/Users/monkey/Desktop/data.txt' INTO TABLE demo FIELDS TERMINATED BY ',' LINES TERMINATED BY ';';
其中，元数据间隔符，行结束符可以自行指定；
使用改命令会产生报错：ERROR: Loading local data is disabled - this must be enabled on both the client and server sides
解决方案：
mysql> SET GLOBAL local_infile=1;
Query OK, 0 rows affected (0.00 sec)

退出mysql，并重新进入即可。参考资料：https://stackoverflow.com/questions/59993844/error-loading-local-data-is-disabled-this-must-be-enabled-on-both-the-client

*/
```
