import { client } from "@/utils/sanityClient";

export async function POST(request: Request) {
    const doc : any = request.body;
  try{
    const query = `*[_type == "user" && email == '${doc.email}'][0]`;

    const user = await client.fetch(query);
    console.log(doc,user)
    if(user){
        const data : any = {
            _id: user._id,
            type: 'user',
            userName: user.userName,
            email: user.email
        }
        return new Response(data)
    }
    if(!user){
        client.create(doc).then((data : any) => {
            return new Response(data)
          });
        } 
  }
  catch(e){
    return new Response('Something went wrong')
  }
  }