# Mendi关键点
## App Modeling

> App modeling is a process of creating and configuring an app, such as creating pages, adding data and logic, configuring security, and integrating with other applications

> The domain model is a model that describes the information (or data) used by your application in an abstract way
### Domain Model<https://docs.mendix.com/refguide/domain-model>
> contains information on creating and maintaining the data model for your app
#### Entity
- Type of Entities: 实体类型定义了数据如何被处理
- Persistable Entity：会被写入数据库，一个entity对应一个database table。该类entiry在domain model中是blue蓝色
- Non-Persistable Entity：存入runtime memory，且不会被提交到数据库。该类entity在domain model中是orange橘色
- external entity：外部实体，A应用引用B应用的data source。该类entity在domain model中是purple紫色
- Entity Property包含以下部分:

    - Access Rules：
        > The access rules of an entity define what a user is allowed to do with objects of the entity.<https://docs.mendix.com/refguide/access-rules>

        > 系统变量<https://docs.mendix.com/refguide/xpath-keywords-and-system-variables>
        
        - XPath:
            > Mendix XPath is one of the Mendix query languages designed to retrieve data. XPath uses path expressions to select data of Mendix objects and their attributes or associations<https://docs.mendix.com/refguide/xpath>
        - Module Security <https://docs.mendix.com/refguide/module-security#module-role>
            > Within a module you can define module roles and specify security settings for pages, microflows, entities, and datasets

            - Module Role: A module role defines a set of access permissions that you can assign to a user
            - Page Access: Page Access defines which pages are visible to each role.
            - Microflow Access:　Microflow Access defines which microflows can be executed by users with a certain module role. 
            - Workflow Access: Workflow access defines which workflows can be triggered by users with a certain module role.
            - Entity Access: Entity Access defines for each module role whether users with this role are authorized to Create, Read, Write and/or Delete objects of the entity
            - OData Access: OData Access defines for each module role whether users with this role are authorized to access OData resources for each OData service exposed within the module
            - REST Access defines for each module role whether users with this role are authorized to access REST resources for each REST service exposed within the module
            - Data Set Access shows the access which the module role has to each dataset.


    - Documatation
        > This allows you to describe aspects of the entity which may be useful to you or other team members when using the entity within the app

    - General
        > 实体的命名和引用以及其它功能

    - System members
        - Store ‘createdDate’：

### Pages<https://docs.mendix.com/refguide/pages>
> A page is the basic end-user interface of a Mendix application. It is used to display information to the end-user, allow end-users to create and edit information, and enable end-users to trigger additional automated processing.
- `Every page is based on a page layout and a page template.A layout is a frame you put your page in. A page template is a basis with predefined elements (widgets).`
#### Data widgets:
- `Data view`
```js
    /*
        Common
        DataSource: The data source determines which object will be shown in the data view
            data view支持以下数据：Context、
        DesignProperties
        Editability
        General
        Visibility
    */
```
- `Data grid`
- `Template grid`
- `List grid`
#### Common widgets
#### Container widgets
#### Input widgets
#### File widgets
#### Button widgets
#### Menu widgets
#### Report widgets
#### Authentication widgets
#### Add-on widgets
### Application Logics<https://docs.mendix.com/refguide/application-logic>
>  gives details on how to use and configure microflows, nanoflows, and workflows: elements that add logic to your app
### Resources<https://docs.mendix.com/refguide/resources>
> introduces various individual resources (documents) that you can use in your application, such as Java actions, enumerations, scheduled events
### DataTypes<https://docs.mendix.com/refguide/data-types>
> 
### Images<https://docs.mendix.com/refguide/images>
### XPath
>  introduces you to the Mendix query language, including details on XPath constraints, functions, and tokens
### Integration
> details methods for integrating with both Mendix and non-Mendix applications
### Security<https://docs.mendix.com/refguide/security>
> Security in Mendix has two sides: you want different people to see different parts of your application and you want to prevent unauthorized access. Both of these can be managed from Studio Pro. Access to forms, data and microflows can be limited to authorized users
### User Role<https://docs.mendix.com/refguide/user-roles>
> A user role aggregates a number of access rights on data, forms, and microflows. An end-user of the application is assigned one or more user roles by an administrator, and gets all access rights that these user roles represent.
### Association
> An association describes a relation between entities
## Version Control 
## git（工作区，暂存区，仓库）
- `git add：工作区修改文件添加到暂存区`
- `git commit：将暂存区提交到仓库`
- `git push：将本地仓库推送到远程仓库`

- `撤销工作区修改, 即撤销git add`
    - `git checkout -- .`
- `撤销暂存区`
    - `HEAD^ 等价 HEAD~1 撤销最近一次commit`
    - `HEAD~n 撤销最近n次commit`
    - `git reset --mixed HEAD^：撤销git commit, 撤销git add, 保留工作区修改，默认mixed操作`
    - `git reset --soft HEAD^：撤销git commit, 不撤销git add, 保留工作区修改`
    - `git reset --mixed HEAD^：撤销git commit, 撤销git add, 删除工作区修改`
- `合并commit, 合并后git push --force可以消除远程分支的被合并的commit log`
    - `git rebase -i commitid 合并commit`
- ``
- ``
- ``