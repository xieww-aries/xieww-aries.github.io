### 基本概念
+ 文档对象模型(Document Object Model)
  - D(Document)
    - 将编写的网页文档转换为一个文档对象
  - O(Object)
    - 对象是一种自足的数据集合，与某个特定对象相关联的变量被称为这个对象的属性，只能通过某个特定对象去掉用的函数被称为这个对象的方法。
      - `用户定义对象`(user-defined object)
      - `内宿对象`(native object) 内建在Javascript语言中的对象，像Array、Math、Date等
      - `宿主对象`(host object) 浏览器提供的对象
  - M(Model)
    - 模型/地图，某种事物的表现形式

### 获取元素
+ `getElementById`
  - document.getElementById(idName);
  - document对象特有的函数方法
+ `getElementsByTagName`
  - element.getElementsByTagName(tagName);
+ `getElementsByClassName`
  - document.getElementsByClassName(className);
  - 老版本浏览器的兼容/扩展写法
  ```js
    function getElementsByClassName(node, className) {
        if (node.getElementsByClassName) {
            return node.getElementsByClassName('className');
        } else {
            var results = new Array();
            var elems = node.getElementsByTagName('*');
            for (var i = 0; i < elems.length; i++) {
                if (elems[i].className.indexOf(className) > -1) {
                    results[results.length] = elems[i];
                }
            }
            return results;
        }
    }  
  ```
  
### 获取和设置属性
+ `getAttribute`
  - 不属于document对象，不能通过document对象调用，它只能通过元素节点对象调用。

+ `setAttribute`
  - 与`getAttribute`一样，只能用于元素节点-
