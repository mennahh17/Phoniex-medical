import {NextResponse} from "next/server";

export async function GET () {
    const products =[
    {id : 1 , name : "CT scanner" , image:"/img/bdc0903ba856a5929d24d284cc18ddfa.jpg"},
    {id : 2 , name : "CT scanner" , image:"/img/bdc0903ba856a5929d24d284cc18ddfa.jpg"},
    {id : 3 , name : "CT scanner" , image:"/img/bdc0903ba856a5929d24d284cc18ddfa.jpg"}
    
    ]

    return NextResponse.json(products);
}