!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_Tabs=__webpack_require__(9),LoadPane=React.createClass({displayName:"LoadPane",getInitialState:function(){return{disabled:!0,alert:""}},chooseFile:function(e){var value=e.target.files[0];this.setState({file:value,disabled:!0,alert:""}),value&&this.setState({disabled:!1})},setAlert:function(type,message){this.setState({alert:type,alertMessage:message})},resetAlert:function(){this.setState({alert:"",alertMessage:""})},loadFile:function(){var callback={success:this.props.loadCallback,error:this.setAlert};Instrument.load(this.state.file,callback)},render:function(){var alert="";switch(this.state.alert){case"success":alert=React.createElement("div",{className:"alert alert-success alert-dismissible",role:"alert"},React.createElement("button",{type:"button",className:"close",onClick:this.resetAlert},React.createElement("span",{"aria-hidden":"true"},"×")),React.createElement("strong",null,"Success!")," Instrument Loaded");break;case"typeError":alert=React.createElement("div",{className:"alert alert-danger alert-dismissible",role:"alert"},React.createElement("button",{type:"button",className:"close",onClick:this.resetAlert},React.createElement("span",{"aria-hidden":"true"},"×")),React.createElement("strong",null,"Error!")," Wrong file format");break;case"duplicateEntry":alert=React.createElement("div",{className:"alert alert-danger alert-dismissible",role:"alert"},React.createElement("button",{type:"button",className:"close",onClick:this.resetAlert},React.createElement("span",{"aria-hidden":"true"},"×")),React.createElement("strong",null,"Error!"),React.createElement("br",null),this.state.alertMessage)}return React.createElement(_Tabs.TabPane,_extends({Title:"Load Instrument"},this.props),React.createElement("div",{className:"col-sm-6 col-xs-12"},alert,React.createElement("input",{className:"fileUpload",type:"file",id:"instfile",onChange:this.chooseFile}),React.createElement("input",{className:"btn btn-primary spacingTop",type:"button",id:"load",value:"Load Instrument",disabled:this.state.disabled,onClick:this.loadFile})))}}),SavePane=React.createClass({displayName:"SavePane",getInitialState:function(){return{fileName:"",instrumentName:""}},loadState:function(newState){this.setState({fileName:newState.fileName,instrumentName:newState.instrumentName})},onChangeFile:function(e){var value=e.target.value;this.setState({fileName:value})},onChangeInst:function(e){var value=e.target.value;this.setState({instrumentName:value})},render:function(){var value=this.state.fileName;return React.createElement(_Tabs.TabPane,_extends({Title:"Save Instrument"},this.props),React.createElement("div",{className:"form-group"},React.createElement("div",{className:"col-xs-12"},React.createElement("label",{className:"col-sm-2 control-label"},"Filename: "),React.createElement("div",{className:"col-sm-4"},React.createElement("input",{className:"form-control",type:"text",id:"filename",value:value,onChange:this.onChangeFile}))),React.createElement("div",{className:"col-xs-12 spacingTop"},React.createElement("label",{className:"col-sm-2 control-label"},"Instrument Name: "),React.createElement("div",{className:"col-sm-4"},React.createElement("input",{className:"form-control",type:"text",id:"longname",value:this.state.instrumentName,onChange:this.onChangeInst}))),React.createElement("div",{className:"col-xs-12 spacingTop"},React.createElement("div",{className:"col-xs-12 col-sm-4 col-sm-offset-2"},React.createElement("input",{className:"btn btn-primary col-xs-12",type:"submit",value:"Save",onClick:this.props.save})))))}}),DisplayElements=React.createClass({displayName:"DisplayElements",getPlaceholder:function(){if(!this.placeholder){var tr=document.createElement("tr");tr.className="placeholder";var td=document.createElement("td");td.colSpan=2,td.appendChild(document.createTextNode("Drop here")),tr.appendChild(td),this.placeholder=tr}return this.placeholder},getTableRow:function(element){return"tr"===element.tagName?element:$(element).closest("tr")[0]},dragStart:function(e){this.dragged=this.getTableRow(e.currentTarget),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/html",e.currentTarget)},dragEnd:function(e){this.dragged.style.display="table-row",this.dragged.parentNode.removeChild(this.getPlaceholder());var data=this.props.elements,from=Number(this.dragged.dataset.id),to=Number(this.over.dataset.id);from<to&&to--,"after"===this.nodePlacement&&to++,data.splice(to,0,data.splice(from,1)[0]),this.setState({data:data})},dragOver:function(e){e.preventDefault();var targetRow=this.getTableRow(e.target);if(this.dragged.style.display="none","placeholder"!==targetRow.className){this.over=targetRow;var relY=e.pageY-$(this.over).offset().top,height=this.over.offsetHeight/2,parent=targetRow.parentNode;relY>=height?(this.nodePlacement="after",parent.insertBefore(this.getPlaceholder(),targetRow.nextElementSibling)):(this.nodePlacement="before",parent.insertBefore(this.getPlaceholder(),targetRow))}},render:function(){var tableRows=this.props.elements.map(function(element,i){var row=void 0,colStyles={wordWrap:"break-word"};return row=element.editing?React.createElement("tr",{"data-id":i,key:i,draggable:this.props.draggable,onDragEnd:this.dragEnd,onDragStart:this.dragStart},React.createElement("td",{className:"col-xs-2",colSpan:"3"},React.createElement(AddElement,{updateQuestions:this.props.updateElement,element:element,index:i}))):React.createElement("tr",{"data-id":i,key:i,draggable:this.props.draggable,onDragEnd:this.dragEnd,onDragStart:this.dragStart},React.createElement("td",{style:colStyles},element.Name),React.createElement("td",{style:colStyles},React.createElement(LorisElement,{element:element})),React.createElement("td",{style:colStyles},React.createElement("button",{onClick:this.props.editElement.bind(null,i),className:"button"},"Edit"),React.createElement("button",{onClick:this.props.deleteElement.bind(null,i),className:"button"},"Delete")))}.bind(this)),tableStyles={tableLayout:"fixed"};return React.createElement("table",{id:"sortable",className:"table table-hover",style:tableStyles},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{className:"col-xs-2"},"Database Name"),React.createElement("th",{className:"col-xs-6"},"Question Display (Front End)"),React.createElement("th",{className:"col-xs-4"},"Edit"))),React.createElement("tbody",{onDragOver:this.dragOver},tableRows))}}),BuildPane=React.createClass({displayName:"BuildPane",getInitialState:function(){return{Elements:[{Type:"ElementGroup",GroupType:"Page",Description:"Top",Elements:[]}],amountEditing:0,currentPage:0,elementDBNames:{}}},loadElements:function(elements){var elContent=elements[this.state.currentPage].Elements,elNames={};elContent.forEach(function(el){elNames[el.Name]=""}),this.setState({Elements:elements,elementDBNames:elNames})},editElement:function(elementIndex){this.setState(function(state){var temp=state.Elements,edit=state.amountEditing+1,dbNames=state.elementDBNames;return delete dbNames[temp[state.currentPage].Elements[elementIndex].Name],temp[state.currentPage].Elements[elementIndex].editing=!0,{Elements:temp,amountEditing:edit,elementDBNames:dbNames}})},deleteElement:function(elementIndex){this.setState(function(state){var temp=state.Elements,dbNames=state.elementDBNames;return delete dbNames[temp[state.currentPage].Elements[elementIndex].Name],temp[state.currentPage].Elements.splice(elementIndex,1),{Elements:temp}})},updateElement:function(element,index){return!(element.Name&&element.Name in this.state.elementDBNames)&&(this.setState(function(state){var temp=state.Elements,edit=state.amountEditing-1,dbNa=state.elementDBNames;return temp[state.currentPage].Elements[index]=element,element.Name&&(dbNa[element.Name]=""),{Elements:temp,amountEditing:edit,elementDBNames:dbNa}}),!0)},addQuestion:function(element){return!(element.Name&&element.Name in this.state.elementDBNames)&&(this.setState(function(state){var temp=state.Elements,dbNa=state.elementDBNames;return element.Name&&(dbNa[element.Name]=""),temp[state.currentPage].Elements.push(element),{Elements:temp,elementDBNames:dbNa}}),!0)},addPage:function(pageName){this.setState(function(state){var temp=state.Elements,page=state.currentPage+1;return temp.push({Type:"ElementGroup",GroupType:"Page",Description:pageName,Elements:[]}),{Elements:temp,currentPage:page}})},selectPage:function(index){this.setState({currentPage:index})},render:function(){var draggable=0===this.state.amountEditing,pages=this.state.Elements.map(function(element,i){return React.createElement("li",{key:i,onClick:this.selectPage.bind(null,i)},React.createElement("a",null,this.state.Elements[i].Description))}.bind(this));return React.createElement(_Tabs.TabPane,_extends({Title:"Build Instrument"},this.props),React.createElement("div",{className:"form-group col-xs-12"},React.createElement("label",{htmlFor:"selected-input",className:"col-xs-2 col-sm-1 control-label"},"Page:"),React.createElement("div",{className:"col-sm-4"},React.createElement("div",{className:"btn-group"},React.createElement("button",{id:"selected-input",type:"button",className:"btn btn-default dropdown-toggle","data-toggle":"dropdown"},React.createElement("span",{id:"search_concept"},this.state.Elements[this.state.currentPage].Description),React.createElement("span",{className:"caret"})),React.createElement("ul",{className:"dropdown-menu",role:"menu"},pages)))),React.createElement(DisplayElements,{elements:this.state.Elements[this.state.currentPage].Elements,editElement:this.editElement,deleteElement:this.deleteElement,updateElement:this.updateElement,draggable:draggable}),React.createElement("div",{className:"row"},React.createElement(AddElement,{updateQuestions:this.addQuestion,addPage:this.addPage})))}}),InstrumentBuilderApp=React.createClass({displayName:"InstrumentBuilderApp",saveInstrument:function(){Instrument.save(this.refs.savePane.state,this.refs.buildPane.state.Elements)},loadCallback:function(elements,info){this.refs.savePane.loadState(info),this.refs.buildPane.loadElements(elements),this.refs.loadPane.setAlert("success")},render:function(){var tabs=[];tabs.push(React.createElement(LoadPane,{TabId:"Load",ref:"loadPane",loadCallback:this.loadCallback,key:1})),tabs.push(React.createElement(BuildPane,{TabId:"Build",ref:"buildPane",key:2})),tabs.push(React.createElement(SavePane,{TabId:"Save",ref:"savePane",save:this.saveInstrument,key:3}));var tabList=[{id:"Load",label:"Load"},{id:"Build",label:"Build"},{id:"Save",label:"Save"}];return React.createElement("div",null,React.createElement(_Tabs.Tabs,{tabs:tabList,defaultTab:"Build"},tabs))}}),RInstrumentBuilderApp=React.createFactory(InstrumentBuilderApp);window.RInstrumentBuilderApp=RInstrumentBuilderApp,exports.default=InstrumentBuilderApp},9:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Tabs=function(_React$Component){function Tabs(props){_classCallCheck(this,Tabs);var _this=_possibleConstructorReturn(this,(Tabs.__proto__||Object.getPrototypeOf(Tabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this.props.updateURL&&hash?activeTab=hash.substr(1):_this.props.defaultTab?activeTab=_this.props.defaultTab:_this.props.tabs.length>0&&(activeTab=_this.props.tabs[0].id),_this.state={activeTab:activeTab},_this.handleClick=_this.handleClick.bind(_this),_this.getTabs=_this.getTabs.bind(_this),_this.getTabPanes=_this.getTabPanes.bind(_this),_this}return _inherits(Tabs,_React$Component),_createClass(Tabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("ul",{className:"nav nav-tabs",role:"tablist",style:tabStyle},tabs),React.createElement("div",{className:"tab-content"},tabPanes))}}]),Tabs}(React.Component);Tabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},Tabs.defaultProps={onTabChange:function(){},updateURL:!0};var VerticalTabs=function(_React$Component2){function VerticalTabs(props){_classCallCheck(this,VerticalTabs);var _this2=_possibleConstructorReturn(this,(VerticalTabs.__proto__||Object.getPrototypeOf(VerticalTabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this2.props.updateURL&&hash?activeTab=hash.substr(1):_this2.props.defaultTab?activeTab=_this2.props.defaultTab:_this2.props.tabs.length>0&&(activeTab=_this2.props.tabs[0].id),_this2.state={activeTab:activeTab},_this2.handleClick=_this2.handleClick.bind(_this2),_this2.getTabs=_this2.getTabs.bind(_this2),_this2.getTabPanes=_this2.getTabPanes.bind(_this2),_this2}return _inherits(VerticalTabs,_React$Component2),_createClass(VerticalTabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("div",{className:"tabbable col-md-3 col-sm-3"},React.createElement("ul",{className:"nav nav-pills nav-stacked",role:"tablist",style:tabStyle},tabs)),React.createElement("div",{className:"tab-content col-md-9 col-sm-9"},tabPanes))}}]),VerticalTabs}(React.Component);VerticalTabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},VerticalTabs.defaultProps={onTabChange:function(){},updateURL:!0};var TabPane=function(_React$Component3){function TabPane(){return _classCallCheck(this,TabPane),_possibleConstructorReturn(this,(TabPane.__proto__||Object.getPrototypeOf(TabPane)).apply(this,arguments))}return _inherits(TabPane,_React$Component3),_createClass(TabPane,[{key:"render",value:function(){var classList="tab-pane",title=void 0;return this.props.TabId===this.props.activeTab&&(classList+=" active"),this.props.Title&&(title=React.createElement("h1",null,this.props.Title)),React.createElement("div",{role:"tabpanel",className:classList,id:this.props.TabId},title,this.props.children)}}]),TabPane}(React.Component);TabPane.propTypes={TabId:React.PropTypes.string.isRequired,Title:React.PropTypes.string,activeTab:React.PropTypes.string},exports.Tabs=Tabs,exports.VerticalTabs=VerticalTabs,exports.TabPane=TabPane}});
//# sourceMappingURL=react.instrument_builder.js.map