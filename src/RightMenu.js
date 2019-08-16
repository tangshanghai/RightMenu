import Utils from './Utils.js';
import './RightMenu.css';
class RightMenu{
    constructor(){

        console.log('==============RightMenu 0.0.1=================')
        this.mainMenu = null;//document.createElement('div');
        // this.root.classList.add('right-menu-tsh');

        this.callback = null;

        this.timer = null;
        this.delayTimer = 500; 
    }

    
    /**
     * {
            menus:[
                {
                    title:'menu1',
                    shortKey: '',
                    mark:'1'
                },
                {
                    title:'menu2',
                    mark:'2',
                    menus:[
                        {
                            title:'menu2-1',
                            mark:'2-1'
                        },
                        {
                            title:'menu2-2',
                            mark:'2-2'
                        }
                    ]   
                },
                {
                    divider: true
                },
                {
                    title:'menu3',
                    mark:'3'
                }
            ]
        }
     * @param {*菜单数据结构} _menudata 
     * @param {*返回函数} callback 
     */
    show(_menudata,callback){
        if(this.mainMenu){
            this.destroy();
        }
        document.addEventListener("mousedown",this.mousedownHandler);

        this.callback = callback;
        // console.log(_menudata)
        this.createMenu(_menudata);

    }

    /**
     * 创建 menu
     */
    createMenu(_menudata){
        let menus = _menudata.menus;
        this.mainMenu = this.createMenuUl(menus,1,'');
        let rootUl = this.mainMenu.dom;
        // console.log(this.mainMenu )
        document.body.appendChild(rootUl);
        rootUl.style.zIndex = Utils.getMaxZindex();
        // console.log(this.root.offsetWidth,this.root.offsetHeight)
        let curW = rootUl.offsetWidth,curH = rootUl.offsetHeight,stageW = document.body.clientWidth,stageH = document.body.clientHeight;
        let x = _menudata.event.clientX,y = _menudata.event.clientY;
        if(x+curW>stageW){
            x = Math.min(x-curW,stageW-curW);
        }
        if(y+curH>stageH){
            y = Math.min(y-curH,stageH-curH);
        }
        rootUl.style.left = x+"px";
        rootUl.style.top = y+"px";
    }

    /**
     * 创建 ul
     */
    createMenuUl(menuArr,layerIndex,parentGuid){
        let ulObj = {
            type: 'ul',
            dom: document.createElement('ul'),
            lis: []
        }
        let ul = ulObj.dom;
        ul.classList.add('right-menu-tsh');
        for(let i=0;i<menuArr.length;i++){
            let liObj = this.createMenuItem(menuArr[i],layerIndex,parentGuid);
            ul.appendChild(liObj.dom);
            ulObj.lis.push(liObj);
        }
        return ulObj;
    }
    /**
     * 创建 li
     */
    createMenuItem(item,layerIndex,parentGuid){
        let liObj = {
            type:'li',
            dom: document.createElement('li'),
            ulObj: null,
            guid: Utils.GUID(),
            parentGuid: parentGuid,
            layerIndex:layerIndex
        }
        let li = liObj.dom;
        li.classList.add('rm-menuitem');
        // li.setAttribute('guid',liObj.guid);
        li.guid = liObj.guid;
        li.layerIndex = liObj.layerIndex;
        li.mark = item.mark;
        if(item.divider){
            li.classList.add('divider');
            return liObj;
        }
        let icon = item.shortKey || '';
        if(item.menus && item.menus.length>0){
            icon = '<span class="arrow"></span>';
            // console.log(item.menus)
            li.isChildren = true;
            liObj.ulObj = this.createMenuUl(item.menus,layerIndex+1,liObj.guid);
        }
        let content = '<label>'+item.title+'</label><span class="icon">'+icon+'</span>';
        li.innerHTML = content;
        if(item.disabled){
            li.classList.add('disabled');
        }

        li.addEventListener('click',this.itemClickHandler);
        li.addEventListener('mouseover',this.itemOverHandler);
        li.addEventListener('contextmenu',this.contextmenuHandler);
        // li.addEventListener('mouseout',this.itemOutHandler);
        return liObj;
    }

    /**
     * 注册点击事件
     */
    itemClickHandler = (event) =>{
        let curNode = event.currentTarget;
        let guid = curNode.guid;
        let layerIndex = curNode.layerIndex;
        if(curNode.isChildren){
            this.showUL(curNode,guid,layerIndex,2);
        }else{
            if(this.callback){
                this.callback(curNode.mark);
            }
            this.destroy();
        }
    }

    /**
     * 滑过事件
     */
    itemOverHandler = (event) => {
        let curNode = event.currentTarget;
        let guid = curNode.guid;
        let layerIndex = curNode.layerIndex;
        
        this.showUL(curNode,guid,layerIndex,this.delayTimer);
        
        
        // console.log('滑过事件',event);
    }

    /** 右键点击事件 */
    contextmenuHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('右键点击事件右键点击事件右键点击事件')
    }

    /**
     * show菜单
     */
    showUL(curNode,guid,layerIndex,_delayTime){
        let curliObj = null;
        let parentliObj = null;
        let sameLayers = [];

        getSelfAndSame(this.mainMenu.lis,guid,null);
        //若是guid为自己，则查找并显示自己下一级的菜单，否则递归查询同级下一级，将其移除
        function getSelfAndSame(lis,guid,_parentliObj){
            for(let i=0;i<lis.length;i++){
                let liObj = lis[i];
                if(liObj.guid === guid){
                    curliObj = liObj;
                    parentliObj = _parentliObj;
                }
                else if(liObj.layerIndex === layerIndex){
                    sameLayers.push(liObj);
                }else{
                    if(liObj.ulObj){
                        getSelfAndSame(liObj.ulObj.lis,guid,liObj);
                    }
                }
            }
        }
        if(parentliObj){
            if(parentliObj.dom.className.indexOf('selected')===-1){
                parentliObj.dom.classList.add('selected')
            }
        }
        function removeSameLayerSelected(lis){
            for(let i=0;i<lis.length;i++){
                let liObj = lis[i];
                if(liObj.dom.className.indexOf('selected')>-1){
                    liObj.dom.classList.remove('selected')
                }
                if(liObj.ulObj){
                    removeSameLayerSelected(liObj.ulObj.lis);
                }
            }
        }
        removeSameLayerSelected(sameLayers);

        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.delayShowUL(curNode,curliObj,parentliObj,sameLayers);
        },_delayTime);
    }
    /**
     * 
     * @param {*} event 
     */
    delayShowUL(curNode,curliObj,parentliObj,sameLayers){
        
        // let mainMenu = this.mainMenu;
        // let curliObj = null;
        // let parentliObj = null;
        // let sameLayers = [];

        // getSelfAndSame(this.mainMenu.lis,guid,null);
        // //若是guid为自己，则查找并显示自己下一级的菜单，否则递归查询同级下一级，将其移除
        // function getSelfAndSame(lis,guid,_parentliObj){
        //     for(let i=0;i<lis.length;i++){
        //         let liObj = lis[i];
        //         if(liObj.guid === guid){
        //             curliObj = liObj;
        //             parentliObj = _parentliObj;
        //         }
        //         else if(liObj.layerIndex === layerIndex){
        //             sameLayers.push(liObj);
        //         }else{
        //             if(liObj.ulObj){
        //                 getSelfAndSame(liObj.ulObj.lis,guid,liObj);
        //             }
        //         }
        //     }
        // }
        //删除同级下的所有菜单
        function removeSameLayerMenu(lis){
            for(let i=0;i<lis.length;i++){
                let liObj = lis[i];
                // if(liObj.dom.className.indexOf('selected')>-1){
                //     liObj.dom.classList.remove('selected')
                // }
                if(liObj.ulObj){
                    if(liObj.ulObj.dom.parentNode){
                        liObj.ulObj.dom.parentNode.removeChild(liObj.ulObj.dom);
                    }
                    removeSameLayerMenu(liObj.ulObj.lis);
                }
            }
        }
        removeSameLayerMenu(sameLayers);
        
        //显示当前级下的菜单
        if(curliObj.ulObj){
            //如果当前级下还有显示的菜单，同样移除
            if(curliObj.ulObj.lis.length > 0){
                removeSameLayerMenu(curliObj.ulObj.lis);
            }
            let curW = curNode.offsetWidth,stageW = document.body.clientWidth,stageH = document.body.clientHeight;
            let pos = curNode.getBoundingClientRect();
            let x = curW + pos.left,y = pos.top;
            if(x+curW>stageW){
                x -= 2*curW;
            }
            let ulDom = curliObj.ulObj.dom;
            document.body.appendChild(ulDom);
            ulDom.style.zIndex = Utils.getMaxZindex();
            let nowH = ulDom.offsetHeight;
            if(y+nowH>stageH){
                y = Math.min(y,stageH-nowH);
            }
            ulDom.style.left = x+"px";
            ulDom.style.top = y+"px";
        }
        // if(parentliObj){
        //     if(parentliObj.dom.className.indexOf('selected')===-1){
        //         parentliObj.dom.classList.add('selected')
        //     }
        // }
        // console.log(parentliObj)
    }
    /**
     * 滑开事件
     */
    // itemOutHandler(event){

    // }

    /**
     * 文档按下事件
     * @param {*} event 
     */
    mousedownHandler = (event) => {
        let e = event ? event : window.event;
        let curDom = e.target;
        let isInSide = false;
        function findDom(ulObj){
            let dom = ulObj.dom;
            if(dom == curDom || dom.contains(curDom)){
                isInSide = true;
                return;
            }
            for(let i=0;i<ulObj.lis.length;i++){
                let liObj = ulObj.lis[i];
                if(liObj.ulObj){
                    findDom(liObj.ulObj);
                }
            }
        }
        findDom(this.mainMenu);
        if(isInSide){
            return;
        }
        this.destroy();
    }
    /**
     * 销毁
     */
    destroy(){
        // console.log('aaaaaaaa',this)
        document.removeEventListener("mousedown",this.mousedownHandler);
        // console.log('应该销毁！！')
        let self = this;
        function delAll(ulObj){
            let dom = ulObj.dom;
            if(dom.parentNode){
                dom.parentNode.removeChild(dom);
            }
            for(let i=0;i<ulObj.lis.length;i++){
                let liObj = ulObj.lis[i];
                liObj.dom.removeEventListener('click',self.itemClickHandler);
                liObj.dom.removeEventListener('mouseover',self.itemOverHandler);
                liObj.dom.addEventListener('contextmenu',self.contextmenuHandler);
                // liObj.dom.removeEventListener('mouseout',self.itemOutHandler);
                if(liObj.ulObj){
                    delAll(liObj.ulObj);
                }
            }
        }
        delAll(this.mainMenu);
    }
}

export default RightMenu;