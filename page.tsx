
export default function Page({ todos = [] }) {
  return (
    <ul>
      {todos.map((todo, idx) => (
        <li key={idx}>{typeof todo === 'object' ? JSON.stringify(todo) : todo}</li>
      ))}
    </ul>
  );
}

// Example usage in Express route (not in this file):
// const { createClient } = require('./utils/supabase/client');
// app.get('/todos', async (req, res) => {
//   const supabase = createClient();
//   const { data: todos } = await supabase.from('todos').select();
//   res.render('Page', { todos });
// });
