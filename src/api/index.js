import { message } from "antd";
import ajax from "./ajax";

const BASE = ''

//登入
export const reqLogin =(username,password)=> ajax(BASE+'/api1/login',{username,password},'POST') 

//添加用戶
export const reqAdduser =(user)=> ajax(BASE+'/api1/manage/user/add',user,'POST') 

//獲取商品分頁列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/api1/manage/article/list', {pageNum, pageSize})


/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productTime
 */
export const reqSearchArticle = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/api1/manage/article/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
  })

  //發表/修改 文章
  export const reqAddArticle = (article)=>ajax(BASE+'/api1/manage/article/'+(article._id?'update':'add'),article,'POST')
  

  //修改文章
//   export const reqUpdateArticle = (article)=>ajax(BASE+'/api1/manage/article/update',article,'POST')
  
//天氣請求
export const reqWeather = (city)=>{

    return new Promise((resolve,reject)=>{

        const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-073?Authorization=CWB-AED48F4E-90B4-4BCB-879D-95B868B9BA92&format=JSON&locationName=南屯區`
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const locationName = data.records.locations[0].location[0].locationName;
            const temp = data.records.locations[0].location[0].weatherElement[3].time[0].elementValue[0].value
            const des = data.records.locations[0].location[0].weatherElement[1].time[0].elementValue[0].value
            resolve({locationName,temp,des})
        }).catch(err =>{
            message.error('獲取失敗',err)
        })


    })
    
        
}

