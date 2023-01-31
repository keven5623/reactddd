const menuList = [
    {
        title : '首頁',
        key :'/home',
        icon: 'home'
    },
    {
        title : '文章',
        key :'sub2',
        icon: 'book',
        children:[
            {
                title : '文章總覽',
                key :'/article',
                icon: 'highlight'
            },
            {
                title : '我的文章',
                key :'/myarticle',
                icon: 'smile'
            }
        ]
    },
    {
        title : '課程',
        key :'sub1',
        icon: 'play-square',
        children:[
            {
                title : '課程總覽',
                key :'/lesson',
                icon: 'account-book'
            },
            {
                title : '我的課程',
                key :'/mylesson',
                icon: 'smile'
            },
            {
                title : '問與答',
                key :'/question',
                icon: 'question'
            }
            
        ]
    },
    {
        title : '管理員',
        key :'sub3',
        icon: 'android',
        children:[
            {
                title : '會員資料',
                key :'/member',
                icon: 'user'
            },
            {
                title : '角色管理',
                key :'/role',
                icon: 'smile'
            }
        ]
    }
]

export default menuList