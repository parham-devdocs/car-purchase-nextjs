
declare namespace NodeJs{
    interface ENV{
        NODE_ENV?: 'development' | 'production' | 'test';
        jWT_SECRETkEY:string;
        PORT:string
        
    }
}