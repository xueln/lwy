SET NAMES UTF8;
DROP DATABASE IF EXISTS lwy;
CREATE DATABASE lwy CHARSET=UTF8;
USE lwy;
#用户表
CREATE TABLE lwy_user(
  uid BIGINT PRIMARY KEY AUTO_INCREMENT,
  iphone VARCHAR(16) NOT NULL UNIQUE, 
  upwd VARCHAR(32) NOT NULL,
  email VARCHAR(50),
  nname VARCHAR(32)   #昵称
);
#收货地址信息
CREATE TABLE lwy_receiver_address(
  aid BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES lwy_user (uid),
  receiver VARCHAR(16),
  cellphone VARCHAR(16),
  province VARCHAR(16),
  city VARCHAR(16),
  country VARCHAR(16),
  address VARCHAR(128),
  is_default BOOL     #是否为默认地址
);
#订单表
CREATE TABLE lwy_order(
  oid BIGINT PRIMARY KEY AUTO_INCREMENT,
	user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES lwy_user (uid),
	address_id BIGINT,
	FOREIGN KEY (address_id) REFERENCES lwy_receiver_address (aid),
	status TINYINT,
	/*订单状态 1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消*/
	order_time BIGINT,
	pay_time BIGINT,
	deliver_time BIGINT,
	received_time BIGINT
);

#商品分类
CREATE TABLE lwy_product_family(
	fid BIGINT PRIMARY KEY AUTO_INCREMENT,
	fname VARCHAR(10)
);
#商品表
CREATE TABLE lwy_product(
	pid BIGINT PRIMARY KEY AUTO_INCREMENT,
	family_id INT,
	#FOREIGN KEY (family_id) REFERENCES #lwy_product_family (fid),
	title VARCHAR(128),
	subtitle VARCHAR(300),     #副标题
	price DECIMAL(10,2),
	saleNum INT,               #销售量
	spec VARCHAR(600),             #商品规格
	details VARCHAR(2000),     #描述
	isDiy BOOLEAN,             #可定制商品?
	shelf_time BIGINT          #上架时间        
);
#插入商品表信息
INSERT INTO `lwy_product` (`pid`, `family_id`, `title`, `subtitle`, `price`, `saleNum`, `spec`, `details`, `shelf_time`) 
VALUES 
(1, '10', 'BeeFo小唱机', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符的能量，全方位诠释立体音，实力演绎千百种曲风，尽享HiFi音质。多种功能于一身小唱机，唱响你的生活~', '399.00', '0', '直接购买', NULL, NULL), 
(4, '10', 'BeeFo小唱机', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符的能量，全方位诠释立体音，实力演绎千百种曲风，尽享HiFi音质。多种功能于一身小唱机，唱响你的生活~', '409.00', '0', '个性定制', NULL, NULL),
('2', '2', '赶集鸟', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符的能量，全方位诠释立体音', '39.00', '0', '直接购买', NULL, NULL),
('3', '3', '萌宠化妆镜', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符~', '1589.00', '0', '直接购买', NULL, NULL),
('5', '5', '音乐枕趴趴熊（蓝牙版）', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符~', '138.00', '0', '直接购买', NULL, NULL),
('6', '6', '记忆拼图', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符~', '58.00', '0', '直接购买', NULL, NULL),
('7', '7', '魔术变色杯', '前卫唱机设计，小巧优雅，方正的调性，尽显品味；小体积也有好音乐，内置双3W全频喇叭，爆发每个音符~', '49.00', '0', '直接购买', NULL, NULL);

#商品图片表
CREATE TABLE lwy_pro_pic(
	pid BIGINT PRIMARY KEY AUTO_INCREMENT,
	lid  BIGINT,
	color VARCHAR(200),
	is_spot BOOLEAN,
	sm VARCHAR(500),
	md VARCHAR(500),
	lg VARCHAR(500)
);
#插入信息
INSERT INTO `lwy_pro_pic` (`pid`, `lid`, `color`, `is_spot`, `sm`, `md`, `lg`) VALUES 
(NULL, '1', '栗米灰', '1', 'img/detail/sm1.jpg', 'img/detail/md1.jpg', 'img/detail/lg1.jpg'), 
(NULL, '1', '薄荷绿', '1', 'img/detail/sm2.jpg', 'img/detail/md2.jpg', 'img/detail/lg2.jpg'), 
(NULL, '1', '天真蓝', '1', 'img/detail/sm3.jpg', 'img/detail/md3.jpg', 'img/detail/lg3.jpg'), 
(NULL, '1', '奶酪白', '1', 'img/detail/sm4.jpg', 'img/detail/md4.jpg', 'img/detail/lg4.jpg'), 
(NULL, '1', '薄樱粉', '0', 'img/detail/sm5.jpg', 'img/detail/md5.jpg', 'img/detail/lg5.jpg'), 
(NULL, '4', '奶酪白', '1', 'img/detail/sm_diy1.jpg', 'img/detail/md_diy1.jpg', 'img/detail/lg_diy1.jpg'),
(NULL, '4', '薄荷绿', '1', 'img/detail/sm_diy2.jpg', 'img/detail/md_diy2.jpg', 'img/detail/lg_diy2.jpg'), 
(NULL, '4', '天真蓝', '1', 'img/detail/sm_diy3.jpg', 'img/detail/md_diy3.jpg', 'img/detail/lg_diy3.jpg'), 
(NULL, '4', '栗米灰', '1', 'img/detail/sm_diy4.jpg', 'img/detail/md_diy4.jpg', 'img/detail/lg_diy4.jpg'), 
(NULL, '4', '薄樱粉', '0', 'img/detail/sm_diy5.jpg', 'img/detail/md_diy5.jpg', 'img/detail/lg_diy5.jpg'),
(NULL, '2', '', '0', 'img/product/bird.jpg', 'img/product/bird.jpg', 'img/product/bird.jpg'),
(NULL, '3', '', '0', 'img/product/jing.jpg', 'img/product/jing.jpg', 'img/product/jing.jpg'),
(NULL, '5', '', '0', 'img/product/xiong.png', 'img/product/xiong.png', 'img/product/xiong.png'),
(NULL, '6', '', '0', 'img/product/jiyi.jpg', 'img/product/jiyi.jpg', 'img/product/jiyi.jpg'),
(NULL, '7', '', '0', 'img/product/cup.jpg', 'img/product/cup.jpg', 'img/product/cup.jpg');

#订单详情表
CREATE TABLE lwy_order_detail(
	did BIGINT PRIMARY KEY AUTO_INCREMENT,
	order_id BIGINT,
	FOREIGN KEY (order_id) REFERENCES lwy_order (oid),
	product_id BIGINT,
	FOREIGN KEY (product_id) REFERENCES lwy_product (pid),
	count INT 
);
#购物车表
CREATE TABLE lwy_shopping_cart(
	cid INT,
	user_id BIGINT,
	FOREIGN KEY (user_id) REFERENCES lwy_user (uid),
	product_id BIGINT,
	FOREIGN KEY (product_id) REFERENCES lwy_product (pid),
	count INT          
);


#商品标签
CREATE TABLE product_tag(
	tid BIGINT PRIMARY KEY AUTO_INCREMENT,
	pro_id BIGINT,
	FOREIGN KEY (pro_id) REFERENCES lwy_product (pid),
	tag_name varchar(10) 
);
#商品规格属性表
CREATE TABLE pro_spec_attribute(
	att_id BIGINT PRIMARY KEY AUTO_INCREMENT,
	pro_id BIGINT,
	FOREIGN KEY (pro_id) REFERENCES lwy_product (pid),
	#规格属性 (礼物颜色、个人定制)
	spec_name VARCHAR(20)    
);
#商品规格属性值

CREATE TABLE spec_attribute_v(
	vid BIGINT PRIMARY KEY AUTO_INCREMENT,
	spec_att_id BIGINT,
	FOREIGN KEY (spec_att_id) REFERENCES pro_spec_attribute (att_id),
	value VARCHAR(20)
);

#首页轮播图
CREATE TABLE lwy_index_carousel(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(128),
	pro_id BIGINT
);
#插入轮播图图片
INSERT INTO `lwy_index_carousel` (`cid`, `img`, `pro_id`) VALUES 
(NULL, 'img/index/carousel/carousel1.jpg', '1'), 
(NULL, 'img/index/carousel/carousel2.jpg', '2'),
(NULL, 'img/index/carousel/carousel3.jpg', '3'),
(NULL, 'img/index/carousel/carousel4.jpg', '4'),
(NULL, 'img/index/carousel/carousel5.jpg', '5');
