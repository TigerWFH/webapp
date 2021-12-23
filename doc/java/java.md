# Java Spring

## Java 注解是 Java 5 的新特性，是插入代码中的一种注释或者说元数据，并不是代码，注解可以在编译期间（编译工具）和运行期间（java 反射机制）被处理

> 注解使用的地方：package、class、method、field

## JavaEE

> JavaEE 规范：JDBC，JNDI，EJB，RMI，JSP，Servlets，XML，JMS，Java IDL，JTS，JTA，JavaMail，JAF。Tomcat 也没完全实现 JavaEE 规范。13 种核心技术，Tomcat 只实现了俩：Servlet 和 JSP。而其他服务器比如 JBoss、Weblogic 啥的都是完全支持的。所以人们往往更愿意叫 Tomcat 为轻量级的服务器，也有叫它 Servlet/JSP 容器的。

- `Tomcat目录结构:`

```js
/**
 *
 * bin/-------存放启动和关闭Tomcat的脚本文件
 * conf/------配置文案
 * lib/-------存放Tomcat和web应用的jar文件
 * logs/------存放Tomcat日志
 * temp/------存放Tomcat运行产生的临时文件
 * webapps/---存放web应用，静态资源
 * work/------存放JSP生成的Servlet源文件和字节码文件
 * LICENSE
 * NOTICE
 * RELEASE.NOTES
 * RUNNING.txt
 *
 *
 * Server-----------------------
 *      Service--------------------
 *              Connector----
 *              Connector----
 *              Connector----
 *
 *
 *
 * /
```

## Servlet、Tomcat、Spring<https://www.zhihu.com/question/21416727>

- `Servlet, ServletConfig, GenericServlet, HttpServlet, SpringMVC的DispatcherServlet（基于HttpServlet）`
- `JavaWeb三大件：Servlet、Filter、Listener`
- `Tomcat（Servlet容器）是应用服务器，监听80端口，监听到请求，转交给对应的Servlet处理；Servlet处理后将结果转交给Tomcat，再返回Client`
- `Servlet接口，单实例多线程的方式处理多个请求，可以拦截HTTP发送过来的请求`
- `Spring，任何Spring Web的entry point都是servlet，核心思想是：依赖注入、面向切面编程、模板技术`

## spring boot 配置文件

> spring boot 项目默认会在 resources 目录下生成配置文件 application.properties。spring boot 中以公共可以再 4 个地方存放配置文件，分别是`根目录下的config`、`根目录`、`resources目录下的config目录`、`resources目录`

- `application.properties/application.yaml`
- `application-local.properties`
- `applicationContext.xml`
- `mybatis-config.xml`

> 配置使用 properties 文件: run configuration--->Environment variables:

- `spring.config.location=classpath:/XXX/`
- `spring.config.name=XXX`

> 和配置相关的注解: 普通属性注入和类型安全属性注入

- `@Values("${student.userId}")`
- `@PropertyResource("classpath:student.properties")`
- `@ConfigurationProperties(prefix="student")`

## Java 构建工具：Ant/Maven/Gradle

- `make/nmake`
- `Ant: 基于build.xml进行配置，可以理解是一个任务流工具，任务流之间设置依赖关系。无依赖管理功能`

```js
/*
<?xml version="1.0" encoding="UTF-8" ?>  
    <project name="HelloWorld" default="run" basedir=".">  
    <property name="src" value="src"/>  
    <property name="dest" value="classes"/>  
    <property name="jarfile" value="hello.jar"/>  
    // 任务1
    <target name="init">  
        <mkdir dir="${dest}"/>  
    </target>  
    // 任务2
    <target name="compile" depends="init">  
        <javac srcdir="${src}" destdir="${dest}"/>  
    </target>  
    // 任务3
    <target name="build" depends="compile">  
    <jar jarfile="${jarfile}" basedir="${dest}"/>  
    </target>  
    // 任务4
    <target name="test" depends="build">  
        <java classname="test.ant.HelloWorld" classpath="${hello_jar}"/>  
    </target>
    // 任务5
    <target name="clean">  
        <delete dir="${dest}" />  
        <delete file="${hello_jar}" />  
    </target>  
</project
*/
```

- `Maven: 提供了依赖管理，抛弃了ant中的任务流，提供了生命周期，基于xml配置，约定优于配置，既不鼓励自定义任务`

  > maven 仓库和

  > maven 坐标(groupId, artifactId, version, packing 打包方式, classifier 定义构建输出的一些附属构建)

  > maven 依赖 dependencies, dependency, groupId, artifactId, version

  > maven 生命周期 validate、compile、test、package、verify、install、deploy

  > maven install; maven clean; maven deploy

  > maven 配置文件：全局配置文件 settings.xml，maven 安装目录的 conf 子目录下或者用户目录下的.m2 目录;

  > pom.xml（Project Object Model）：项目对象模型，包含了依赖关系、构建目录、源目录、测试目录、插件、目标等项目信息和配置信息。Maven 读取 pom 文件，然后执行构建目标

  > maven profile：解决不同环境所需的不同变量、配置等问题。可以存在多个 profile，且可以组合使用。settings.xml，pom.xml，profiles.xml 都可以覆写 profile(profiles, profile, id, repositories, repository, url, releases, enabled, snapshots)

```js
/*
settings.xml是maven的兜底配置
pom.xml除了项目配置信息，也会有部分maven配置信息
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.qikegu.demo</groupId>
    <artifactId>mybatis-demo</artifactId>
    <version>0.0.1</version>
    <packaging>jar</packaging>  

    <name>mybatis demo </name>  
    <url>http://www.qikegu.com</url>  

    <dependencies>  
        <!-- https://mvnrepository.com/artifact/junit/junit -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13-beta-2</version>
            <scope>test</scope>
        </dependency>
    </dependencies> 
</project>  

 */
```

- `Gradle: 继承了maven，同事继承了ant的target概念，既gradle中的task`
  > build.gradle，gradle，settings.gradle<https://www.cnblogs.com/steffen/p/9212765.html>
  > 基于 groovy 配置文件，gradle dsl， Android dsl

```js
/*
// build.gradle
apply plugin: "java"
repositories: {
    jcenter()
    google()
}
dependencies: {
    compiler "org.slf4j:slf4j-api:1.7.21"
    testCompile "junit:junit:4.12"
}
*/
```

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

## 术语

- `装配（wiring）：`在 Spring 中，对象无需自己查找或创建与其所关联的其他对象。相反，容器负责把需要相互协作的对象引用赋予各个对象。创建应用对象之间协作关系的行为通常称为装配（wiring），这也是依赖注入的本质。默认情况下，Spring 中的 bean 都是单例 的

```js
    /**
     * Spring提供了三种主要的装配机制，可以混合使用：
     * 1、在XML中进行显式配置
     *  直接配置XML文件：
     *  声明Bean
     *      <bean id="xx" class="soundsystem.SgtPeppers" />
     *  声明DI
     *      <bean id="cdPlayer" class="soundsystem.SgtPeppers">
     *          <constructor-arg ref="compactDisc" />
     *      </bean>
     * 2、在Java中进行显式配置：当引入第三方库时，无法使用@Component和@Autowired注解添加到第三方类上，必须显式配置依赖
     *      通常会将JavaConfig放到单独的包中，使用@Configuration注解
     *
     * 3、隐式的bean发现机制和自动装配:
     *      3-1：组件扫描（component scanning），Spring会自动发现应用上下文中所创建的bean
     *      3-2：自动装配（autowiring），Spring自动满足bean之间的依赖
     *      3-3：组件扫描默认是关闭的，需要配置开启
     *
     *
     * /
```

- `注解：`

```js
    /**
     * （）内的例如@Named，@Inject，等是Java依赖注入规范中的注解
     * 1、@Component（@Named）：表明某个类为称为一个组件类，并告知Spring要为这个类创建Bean，因为使用了@Component注解，就没必要显示配置bean，Spring会自动扫描并装配
     * 2、@ComponentScan：启用组件扫描，对应xml配置：<context:component-scan base-package="soundsystem" />
     * 3、@ContextConfiguration：基于java的配置
     * 4、@Autowired（@inject）：Spring特有的注解。自动装配，可以用在构造器上，也可以用到类的其它方法上
     * 5、@Configuration：表明这个类是一个配置类
     * 6、@Bean：该注解会告诉Spring这个方法会返回一个对象，默认情况下，Spring中的bean都是单例的
     * 7、@Import：JavaConfig拆分引入方式
     * 8、@ImportResource：引入基于XML的配置
     * /
```

- `视图解析器：InternalResourceViewResolver，可以解析return的jsp、html页面，并且跳转到相应页面；若返回json等内容到页面，则需要添加@ResponseBody`
- `HttpMessageConvert，http消息转换工具`

- `Application注解：`

  - `@SpringBootApplication：`
  - `@EnableDiscoveryClient：`
  - `ComponentScan：`
  - `ImportResource`

- `Controller注解：`

  - `@Controller：可以返回视图数据`
  - `@RestController：只能返回JSON数据，需要额外注解`
  - `@RequestBody`
  - `@RequestMapping：映射请求，指定控制器可以处理哪些URL请求，相当于Servlet中在web.xml的一些配置`
  - `@Autowired`
  - `@CheckPermission`
  - `@Valid`
  - `@PathVariable`
  - `@RequestParam`
  - `@CrossOrigin`

- `classpath？？？`
