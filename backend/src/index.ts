import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
  }
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const api = new Hono().basePath('/api/v1')

app.post('/signup', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }
    })
    return c.text('jwt here')
  } catch (error) {
    return c.text('error'),c.status(403);
  }
  
})
app.post('/signin', (c) => c.text("Post the user login details"))
app.put('/blog', (c) => c.text("Put or update the details"))
app.get('/blog/:id', async (c) => {
  const id = c.req.param('id');
})

export default app
