export default class BaseController{
  constructor() {

  }
  public  success(ctx:any,code:number,data:any,msg:string){
    // data为null的时候不传递data
    ctx.body = {
      type:'success',
      data:data || null,
      msg:msg || ''
    }
    ctx.status = code
  }
  error(ctx:any,code:number,msg:string){
    ctx.body = {
      type:'error',
      msg:msg || ''
    }
    ctx.status = code
  }
}