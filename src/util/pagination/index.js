'use strict';
require('./index.css');
var _mall=require('util/mall.js');
var paginationTemplate=require('./index.string');

var Pagination=function () {
    var _this=this;
    //设置好当前的一些默认配置
    this.defaultOption={
        container:null,
        pageNum:1,
        pageRange:3,
        onSelectPage:null
    };

    //冒泡事件处理页码点击的时候的事件
    $(document).on('click','.pg-item',function () {
        var $this=$(this);
        if($this.hasClass('active')||$this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage==='function'?
            _this.option.onscroll($this.data('value')):null;
    });
};
Pagination.prototype.render=function(userOption){
    //extend   将两个或更多对象的内容合并到第一个对象。
    this.option=$.extend({},this.defaultOption,userOption);

    //判断容器是不是合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }

    //判断是否只有一页
    if(this.option.pages === 1){
        return;
    }

    //渲染分页的内容
    this.option.container.html(this.getPaginationHtml());
};

//生成分页控件的html代码
Pagination.prototype.getPaginationHtml=function(){
    var html='',
        option=this.option,
        pageArray=[],
        start=option.pageNum=option.pageRange>0 ? option.pageNum-option.pageRange:1,
        end=option.pageNum+option.pageRange<option.pages?option.pageNum+option.pageRange:option.pages;

    //上一页按钮
    pageArray.push({
        name:'上一页',
        value:this.option.prePage,
        disabled:!this.option.hasPreviousPage
    });

    //数字按钮
    for(var i=start;i<=end;i++){
        pageArray.push({
            name:i,
            value:i,
            active:(i===option.pageNum)
        });
    }

    //下一页按钮
    pageArray.push({
        name:'下一页',
        value:this.option.nextPage,
        disabled:!this.option.hasNextPage
    });
    //组织html
    html=_mall.renderHtml(paginationTemplate,{
        pageArray:pageArray,
        pageNum:option.pageNum,
        pages:option.pages
    });
    return html;
};

module.exports=Pagination;