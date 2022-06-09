# 描述 dom 中的类继承关系

## Top

```plain
    exception DOMException {
        unsigned short: code;
    }
    interface DOMImplementation {
        boolean hasFeature(in DOMString feature, in DOMString version);
    }
    interface Node {
        readonly attribute DOMString nodeName;
        attribute DOMString nodeValue;
        readonly attribute unsigned short nodeType;
        readonly attribute Node parentNode;
        readonly attribute NodeList childrens;
        readonly attribute Node firstChild;
        readonly attribute Node lastChild;
        readonly attribute Node previousSibling;
        readonly attribute Node nextSibling;
        readonly attribute NamedNodeMap attributes;
        readonly attribute Document ownerDocument;
        Node insertBafore(in Node newChild, in Node refChild) raises(DOMException);
        Node replaceChild(in Node newChild, in Node oldChild) raises(DOMException);
        Node removeChild(in Node oldChild) raises(DOMException);
        Node appendChild(in Node newChild) raises(DOMException);
        boolean hasChildNodes()
        Node cloneNode(in boolean deep);

    }
    interface NodeList {
        Node item(in unsigned long index);
        readonly attribute unsigned long length;
    }
    inteface NamedNodeMap {
        Node getNamedItem(in DOMString name);
        Node setNamedItem(in Node arg) raise(DOMException);
        Node removeNamedItem(in DOMString name) raise(DOMException);
        Node item(in unsigned long index);
        readonly attribute unsigned long length;
    }
    DOMString: 16位，即typedef sequence<unsigned short> DOMString;

    interface Event {}
    interface EventTarget {}
    interface CustomEvent : Event {}
    interface AbortSignal: EventTarget {}
    interface AbortController {}
```

## Second

```plain
    1、interface CharacterData : Node {
        attribute DOMString data;
        readonly attribute unsigned long length;
        DOMString substringData(in unsigned long offset,
                                in unsigned long count)
                                raises(DOMException);
        void appendData(in DOMString arg) raises(DOMException);
        void insertData(in unsigned long offset,
                        in DOMString arg)
                        raises(DOMException);
        void deleteData(in unsigned long offset,
                        in unsigned long count)
                        raises(DOMException);
        void replaceData(in unsigned long offset,
                        in unsigned long count,
                        in DOMString arg)
                        raises(DOMException);
    }
    2、interface Attr : Node {
        readonly attribute DOMString name;
        readonly attribute boolean specified;
                 attribute DOMString value;
    }
    3、interface Element: Node {
        readonly attribute DOMString tagName;
        DOMString getAttribute(in DOMString name);
        DOMString setAttribute(in DOMString name,
                                in DOMString value)
                                raises(DOMException);
        Attr getAttributeNode(in DOMString name);
        Attr setAttributeNode(in Attr newAttr) raises(DOMException);
        Attr removeAttributeNode(in Attr oldAttr) raises(DOMException);
        NodeList getElementsByTagName(in DOMString name);
        void normalize();
    }
    4、interface DocumentType : Node {
        readonly attribute DOMString name;
        readonly attribute NamedNodeMap entities;
        readonly attribute NamedNodeMap notations;
    }
    5、interface DocumentFragment : Node {}
    6、interface Document : Node {
        readonly attribute DocumentType doctype;
        readonly attribute DOMImplementation implementation;
        readonly attribute Element documentElement;
        Element createElement(in DOMString tagName) raises(DOMException);
        DocumentFragment createDocumentFragment();
        Text createTextNode(in DOMString data);
        Comment createComment(in DOMString data);
        CDATASection createCDATASection(in DOMString data) raises(DOMException);
        ProcessingInstruction createProcessingInstruction(in DOMString target, in DOMString data) raises(DOMException);
        Attr createAttribute(in DOMString name) raises(DOMException);
        EntityReference createEntityReference(in DOMString name) raises(DOMException);
        NodeList getElementByTagName(in DOMString tagName);
    }
    7、interface ProcessingInstruction: Node {}
    8、interface Notation : Node {}
    9、interface Entity : Node {}
    10、inteface EntityReference : Node {}

```

## third

```plain
    interface Text : CharacterData {
        Text splitText(in unsigned long offset) raises(DOMException);
    }
    interface Comment : CharacterData {}
```

## fouth

```plain
    interface CDATASection : Text {}
```
