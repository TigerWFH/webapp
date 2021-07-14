```java
    package com.springinaction.knights;
    import java.io.PrintStream;
    public class Minstrel {
        private PrintStream stream;
        public Minstrel(PrintStream stream) {
            this.stream = stream
        }
        public void singBeforeQuest() {
            stream.println("Fa la la, the knight is so brave!");
        }
        public void singAfterQuest() {
            stream.println("Tee hee hee, the brave knight " + "did embark on quest!")
        }
    }
```
```java
    // old
    package com.springinaction.knights;
    public class BraveKnight implements Knight {
        private Quest quest;
        private Minstrel minstrel;

        public BraveKnight(Quest quest, Minstrel minstrel) {
            this.quest = quest;
            this.minstrel = minstrel;
        }

        public void embarkOnQuest() throws QuestException {
            minstrel.singBeforeQuest();
            quest.embark();
            minstrel.singAfterQuest();
        }
    }
    // new AOP将Minstrel抽象为一个切面，然后配置到xml中


```
```java
    public Employee getEmployeeById(long id) {
        Connect conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            conn = dataSource.getConnection();
            stmt = conn.prepareStatement("SQL语句");
            stmt.setLong(1, id);
            rs = stmt.executeQuery();
            Employee employee = null;
            if (rs.next) {
                employee = new Employee();
                employee.setId("");
                employee.setFirstName("");
                // ...
            }

            return employee;
        } catch(SQLException e) {

        } finally {
            // XXXXXXX
        }

        return null;
    }
 ```
 ## Spring定义了多种作用域，可以基于这些作用域创建bean
 * `单例Singleton`：只有一个bean实例
 * `原型Prototype`：每次注入或从上下文获取都会创建一个新的bean实例
 * `会话Session`：在web应用中，为每个会话创建一个bean实例
 * `请求Request`：在web应用中，为每个请求创建一个bean实例
 * `@Scope`：生命组件的作用域
 ```java
    @Component
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public class Notepad {

    }
    /*
        在Web应用中，如果能够实例化在会话和请求范围内共享的bean，那 将是非常有价值的事情。例如，在典型的电子商务应用中，可能会有 一个bean代表用户的购物车。如果购物车是单例的话，那么将会导致 所有的用户都会向同一个购物车中添加商品。另一方面，如果购物车 是原型作用域的，那么在应用中某一个地方往购物车中添加商品，在 应用的另外一个地方可能就不可用了，因为在这里注入的是另外一个 原型作用域的购物车。
        就购物车bean来说，会话作用域是最为合适的，因为它与给定的用户 关联性最大。要指定会话作用域，我们可以使用@Scope注解，它的 使用方式与指定原型作用域是相同的
    */ 
    @Component
    @Scope(
        value=WebApplicationContext.SCOPE_SESSION,
        proxyMode=ScopedProxyMode.INTERFACES
    )
    public ShoppingCart cart() {

    }
 ```
 * `@Value`:
 ```java
    /*
        Spring一直支持将属性定义到外部的属性的文件中，并使用占位符值 将其插入到Spring bean中。在Spring装配中，占位符的形式为使用“${ ... }”包装的属性名称
    */ 
 ```
 * `SpEL`:

 ## 自动化装配bean：组件扫描（component scanning）和自动装配(autowiring)
 * `@Component`：修饰类，表明当前类是组件类并告知Spring为该类创建bean
 * `@ComponentScan`：告诉Spring开启组件扫描，可以传参指定扫描范围
 * `@Named`：来源于Java依赖注入规范，类似@Component，只有细微差别
 * `@AutoWired`：自动装载，可以用在类的任何方法上，如果没有对应bean，会抛出异常，可以设置非必须参数
 * `@Inject`：来源于Java依赖注入规范，类似@AutoWired，有细微差别
 * `@Bean`：告诉Spring当前方法会返回一个对象，该对象要注册成Spring应用上下文中的bean
 * `@Configuration`：告诉Spring当前类是JavaConfig
 * `@Import`：导入Config
 * `@ImportResource`：
 * `@Profile`：profile bean解决环境迁移带来的不一致性问题，该注解指定某个bean术语哪一个profile
 * `@ActiveProfiles`：指定运行测试时要激活哪个profile
 * `@Conditional`：配合@Bean使用
 * `@Qualifier`：
 * `创建自定义注解`：
 ```java
    // Compact disc
    package soundsystem;
    public interface CompactDisc {
        void play();
    }
// -------------------------------
    package soundsystem;
    import org.springframe.stereotype.Component;
    @Component
    public class SgtPeppers implements CompactDisc {
        private String title = "Sgt. Pepper's Longly Hearts Club Band";
        private String artist = "The Beatles";

        public void play() {
            System.out.println("Playing" + title + "by" + artist);
        }
    }
// -------------------------------
    package soundsystem;
    import org.springframework.context.annotation.ComponentScan;
    import org.springframework.context.annotation.Configuration;
    @Configuration
    @ComponentScan
    public class CDPlayerConfig {

    }
// -------------------------------@Profile
    package com.app;
    import javax.activation.DataSource;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.context.annotation.Profile;
    import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
    import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

    @Configuration
    public class DevelopmentProfileConfig {
        @Bean(destroyMethod="shutdown")
        @Profile("dev")
        public DataSource dataSource() {
            return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .addScript("classpath:schema.sql")
            .addScript("classpath:test-data.sql")
            .build()
        }
        @Bean(destroyMethod="shutdown")
        @Profile("prod")
        public DataSource jndiDataSource() {
            return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .addScript("classpath:schema.sql")
            .addScript("classpath:test-data.sql")
            .build()
        }
    }

 ```