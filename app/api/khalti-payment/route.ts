import axios from "axios";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const requestBody : any = await request.json()
   
  const res: any = await axios
    .post("https://a.khalti.com/api/v2/epayment/initiate/", requestBody, {
        headers: {
            "Authorization": 'Key 1a2949d0117c49d8ba404af722f07bdd'
        }
    })
    const data = await res.data
    
   return NextResponse.json({ data })

  }
  