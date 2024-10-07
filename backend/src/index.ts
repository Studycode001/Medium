import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const api = new Hono().basePath('/api/v1')

app.post('/signup', (c) => c.text('Signup page'))
app.post('/signin', (c) => c.text("Post the user login details"))
app.put('/blog', (c) => c.text("Put or update the details"))
app.get('/blog/:id', async (c) => {
  const id = c.req.param('id');
})

export default app
