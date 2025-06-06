// Conexão com o Supabase usando as chaves que você me forneceu
const supabaseUrl = 'https://djvbwyyjbwqootdlqmrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdmJ3eXlqYndxb290ZGxxbXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5ODAzNTUsImV4cCI6MjA2NDU1NjM1NX0.i0EZm0AVXqPoLxEPf_Cs6xfziam3--Ou71KcNsJAL0M';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Referências aos elementos do formulário de login
const loginForm = document.querySelector('#login-form');
const errorMessage = document.querySelector('#error-message');

// Adiciona um "ouvinte" ao formulário. Quando o botão "Entrar" for clicado...
loginForm.addEventListener('submit', async (event) => {
    // Previne que a página recarregue
    event.preventDefault();

    // Pega o email e a senha digitados
    const email = event.target.email.value;
    const password = event.target.password.value;
    
    // Envia os dados para o Supabase para tentar fazer o login
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // Se o Supabase retornar um erro (senha errada, usuário não existe), mostra a mensagem
        console.error('Erro no login:', error.message);
        errorMessage.textContent = 'E-mail ou senha inválidos. Tente novamente.';
    } else {
        // Se o login for bem-sucedido, redireciona o usuário para a página principal
        console.log('Login bem-sucedido!', data.user);
        window.location.href = 'index.html'; // Redireciona para o seu painel
    }
});
