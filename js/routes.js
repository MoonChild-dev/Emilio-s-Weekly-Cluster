class Routes {
    pageArguments;
    page;
    routes
constructor(){
    this.pageArguments= this.getParams();
    this.init();
    
}
    
    
    async init() {
        let routesReq= await fetch('/pages.json');
        this.routes = await routesReq.json();
        
        this.page=this.page= this.getParamValue("page");
        
        if (this.page&&this.routes[this.page]){
            //if (){
                this.loadHtml(this.page);
            //}
        }else {
            this.loadHtml(0);
        }
    }

    getParamValue(valueName){
        let ret=null;
        this.pageArguments.forEach((arg)=>{

            if (arg.name===valueName){
                ret=arg.value;
            }

        })
        return ret;
        
    }
    async loadHtml(id){
        const pageContainer =document.getElementById("pageContainer");
        let page= parseInt(id);
        
        const htmlReq= await fetch(this.routes[page].HTML);
        const htmlContent = await htmlReq.text();
        
        pageContainer.innerHTML=htmlContent;
        /**@type {HTMLCollectionOf<HTMLScriptElement>} */
        const scriptsOg =pageContainer.getElementsByTagName("script");
        
        Array.from(scriptsOg).forEach((e)=>{
            
            if (e.innerHTML){
                const s = document.createElement("script");
                s.innerHTML=e.innerHTML;
                document.body.appendChild(s);
            }else if (e.src){
                const s = document.createElement("script");
                s.src=e.src;
                document.body.appendChild(s);
            }
        })
    }
    getParams() {
            const search = window.location.search;
            const pageArguments = [];
            if (search){
                const splitSearch= search.substring(1).split("&");
                
                splitSearch.forEach((sector)=>{

                    let split = sector.split("=");
                    let name =split[0];
                    let value = split[1]??"";
                    let obj = {"name":name,"value":value};
                    
                    pageArguments.push(obj);
                })

                return pageArguments
            }else{
                return [];
            }

    }
   

}
export default new Routes();