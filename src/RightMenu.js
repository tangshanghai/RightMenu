import Utils from './Utils.js';
import './RightMenu.css';
class RightMenu{
    constructor(){

        console.log('==============RightMenu 0.0.0=================')
        this.root = null;//document.createElement('div');
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
        this.root = this.createMenuUl(menus);
        
        // this.root.appendChild(mainUl);

        document.body.appendChild(this.root);
        
        // let pos = light.root.getBoundingClientRect();
        //     this.main.root.style.left = pos.left+"px";
        //     this.main.root.style.top = (pos.top+35)+"px";
        this.root.style.zIndex = Utils.getMaxZindex();
        // console.log(_menudata.event);
        console.log(this.root.offsetWidth,this.root.offsetHeight)
        let curW = this.root.offsetWidth,curH = this.root.offsetHeight,stageW = document.body.clientWidth,stageH = document.body.clientHeight;
        let x = _menudata.event.clientX,y = _menudata.event.clientY;
        if(x+curW>stageW){
            x = Math.min(x-curW,stageW-curW);
        }
        if(y+curH>stageH){
            y = Math.min(y-curH,stageH-curH);
        }
        // x = Math.min(x,stageW-curW);
        // y = Math.min(y,stageH-curH);
        this.root.style.left = x+"px";
        this.root.style.top = y+"px";
    }

    /**
     * 创建 ul
     */
    createMenuUl(menuArr){
        let ul = document.createElement('ul');
        ul.classList.add('right-menu-tsh');
        for(let i=0;i<menuArr.length;i++){
            let li = this.createMenuItem(menuArr[i]);
            ul.appendChild(li);
        }
        return ul;
    }
    /**
     * 创建 li
     */
    createMenuItem(item){
        let li = document.createElement('li');
        li.classList.add('rm-menuitem');
        li.carryData = item;
        if(item.divider){
            li.classList.add('divider');
            return li;
        }
        let icon = item.shortKey || '';
        if(item.menus && item.menus.length>0){
            icon = '<span class="arrow"></span>';
            // console.log(item.menus)
            li.childrenMenus = this.createMenuUl(item.menus);
        }
        let content = '<label>'+item.title+'</label><span class="icon">'+icon+'</span>';
        li.innerHTML = content;
        if(item.disabled){
            li.classList.add('disabled');
        }

        li.addEventListener('click',this.itemClickHandler);
        li.addEventListener('mouseover',this.itemOverHandler);
        li.addEventListener('mouseout',this.itemOutHandler);
        return li;
    }

    /**
     * 注册点击事件
     */
    itemClickHandler(event){
        console.log('注册点击事件',event);
    }

    /**
     * 滑过事件
     */
    itemOverHandler = (event) => {
        let curNode = event.currentTarget;
        let curNodeUl = curNode.childrenMenus;
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.delayShowUL(curNode,curNodeUl);
            // console.log(this)
        },this.delayTimer);
        
        
        // console.log('滑过事件',event);
    }
    /**
     * 
     * @param {*} event 
     */
    delayShowUL(curNode,curNodeUl){
        console.log('safdjaslfdkjaslfdkja;sf')
        
        // if(curNodeUl){
        //     clearTimeout(this.timer);
        //     this.timer
        // }
        let curW = curNode.offsetWidth,curH = curNode.offsetHeight;
        let parW = curNode.parentNode.offsetWidth,parH = curNode.parentNode.offsetHeight,stageW = document.body.clientWidth,stageH = document.body.clientHeight;
        // let x = event.clientX,y = event.clientY;
        let pos = curNode.getBoundingClientRect();
        let x = parW + pos.left,y = pos.top;
        if(x+parW>stageW){
            x -= 2*parW;
        }
        // if(y+parH>stageH){
        //     y = Math.min(y-parH,stageH-parH,0);
        // }
        
        if(curNodeUl){
            document.body.appendChild(curNodeUl);
            curNodeUl.style.zIndex = Utils.getMaxZindex();
            let nowH = curNodeUl.offsetHeight;
            if(y+nowH>stageH){
                y = Math.min(y,stageH-nowH);
            }
            curNodeUl.style.left = x+"px";
            curNodeUl.style.top = y+"px";
        }else{
            // if(curNodeUl.parentNode){
            //     curNodeUl.parentNode.removeChild(curNodeUl);
            // }
        }
    }
    /**
     * 滑开事件
     */
    itemOutHandler(event){
        // let curNode = event.currentTarget;
        // let curNodeUl = curNode.childrenMenus;
        // if(curNodeUl && curNodeUl.parentNode){
        //     curNodeUl.parentNode.removeChild(curNodeUl);
        // }
    }

    /**
     * 文档按下事件
     * @param {*} event 
     */
    mousedownHandler = (event) => {
        let e = event ? event : window.event;
        if(e.target == this.root || this.root.contains(e.target)){
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
        //遍历子节点
        document.body.removeChild(this.root);
        // console.log(this.root.childNodes,this.root.children);
        let self = this;
        if(this.root.children){
            destroy2(this.root.children);
        }
        // if(this.root.childNodes){
        //     destroy2(this.root.childNodes);
        // }
        
        function destroy2(nodes){
            for(let i=0;i<nodes.length;i++){
                // console.log(nodes[i].nodeName);
                let node = nodes[i];
                if(node.className.indexOf('rm-menuitem')>-1){
                    if(node.className.indexOf('divider')===-1){
                        node.removeEventListener('click',self.itemClickHandler);
                        node.removeEventListener('mouseover',self.itemOverHandler);
                        node.removeEventListener('mouseout',self.itemOutHandler);
                    }
                }else if(node.className.indexOf('right-menu-tsh')>-1){
                    console.log(node,node.parentNode);
                    if(node.parentNode){
                        node.parentNode.removeChild(node);
                    }
                }
                // if(node.name)
            }
        }
    }
}

export default RightMenu;