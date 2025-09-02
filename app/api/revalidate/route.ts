
import { revalidatePath } from "next/cache";
import { NextRequest} from "next/server";

export async function POST (request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret")
    if (secret !== process.env.REVALIDATE_SECRET) {
        return Response.json({message: "Invalid secret"},{status:401})
    }

    try {
        revalidatePath("/essays")
        revalidatePath("/")
        return Response.json({revalidated: true});
    } catch (error) {
        return Response.json({message: "Error revalidating",error},{status:500})
    }
}