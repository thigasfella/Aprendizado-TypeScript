// USUÁRIOS ENCONTRADOS
let allUsers: [number, string, string, string, number, string][] = []

async function searchName(name: string) {
    const api = `https://api.github.com/users/${name}`
    try {
        const response = await fetch(api)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const dados = await response.json()
        allUsers.push([dados.id, dados.login, dados.name, dados.bio, dados.public_repos, dados.repos_url])
        console.log(`Usuário encontrado:`, dados)
        alert(`O usuário ${dados.name} foi encontrado e adicionado a lista de usuários!`)
        return true
    } catch (err) {
        alert(`Erro: ${err.message}`)
        return false
    }
}

async function reposData() {
    interface Data {
        name: string,
        description: string,
        fork: boolean,
        stargazers_count: number
    }
    let usersData: Data[] = []

    for (let user of allUsers) {
        const reposUrl = user[5]
        console.log(`Buscando repositórios para: ${user[2]} com URL: ${reposUrl}`)

        try {
            const response = await fetch(reposUrl)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const repos = await response.json()
            for (let repo of repos) {
                let repoData: Data = {
                    name: repo.name,
                    description: repo.description,
                    fork: repo.fork,
                    stargazers_count: repo.stargazers_count
                }
                usersData.push(repoData)
            }
        } catch (err) {
            alert(`Erro ao buscar repositórios: ${err.message}`)
        }
    }
    let listRepos = 'Repositórios:\n'
    usersData.forEach((repoData: Data) => {
        listRepos +=
            `Nome: ${repoData.name}
        Descrição: ${repoData.description}
        Fork: ${repoData.fork}
        Stargazers Count: ${repoData.stargazers_count}
        \n
        `
    })
    alert(listRepos)
}

async function showUsers() {
    interface User {
        name: string,
        id: number,
    }

    let usersData: User[] = [];

    try {
        for (let user of allUsers) {
            let userDataFormatted: User = {
                name: user[2],
                id: user[0]
            };
            console.log(`Usuário formatado:`, userDataFormatted)
            usersData.push(userDataFormatted);
        }

        let listUsers = 'Usuários:\n';
        usersData.forEach((userData) => {
            listUsers +=
                `Nome: ${userData.name}
            Id: ${userData.id}
            \n`;
        });

        alert(listUsers);

    } catch (err) {
        alert(`Erro ao buscar usuários: ${err.message}`);
    }
}

async function usuariosComMaisRepositoriosPublic() {
    interface User {
        name: string,
        public_repos: number
    }

    let usersData: User[] = [];

    try {
        for (let user of allUsers) {
            let userDataFormatted: User = {
                name: user[2],
                public_repos: user[4]
            };
            console.log(`Usuário formatado:`, userDataFormatted)
            usersData.push(userDataFormatted);
        }
        usersData.sort((a, b) => b.public_repos - a.public_repos)
        const topUsers = usersData.slice(0, 5)

        let listUsers = 'Usuários:\n';
        topUsers.forEach((userData) => {
            listUsers +=
                `Nome: ${userData.name}
            Quantidade de repositórios: ${userData.public_repos}
            \n`;
        });

        alert(listUsers);

    } catch (err) {
        alert(`Erro ao buscar usuários: ${err.message}`);
    }
}

async function sumRepos() {
    let repositorios = 0;

    try {
        for (let repository of allUsers) {
            repositorios += repository[4];
        }

        let listRepository =
            `Total de repositórios públicos:
            Quantidade de repositórios: ${repositorios}
            \n`;

        alert(listRepository);

    } catch (err) {
        alert(`Erro ao buscar usuários: ${err.message}`);
    }
}

async function main() {
    let userOption = 0;

    while (userOption !== 6) {
        const menu = `Painel Principal (Search user in GitHub)
    1 - Procurar um usuário
    2 - Dados de usuários cadastrados
    3 - Todos os usuários cadastrados
    4 - Top 5 usuários com maior número de repositórios
    5 - Soma de todos os repositórios cadastrados
    6 - Encerrar
  `

        userOption = Number.parseInt(prompt(menu))

        switch (userOption) {
            case 1:
                const User = prompt('Digite o nome do usuário:');
                const userFound = await searchName(User);
                if (userFound) {
                    alert('Usuário encontrado com sucesso!');
                } else {
                    alert('Não foi possível encontrar o usuário.');
                }
                break;

            case 2:
                await reposData()
                break
            case 3:
                await showUsers()
                break
            case 4:
                await usuariosComMaisRepositoriosPublic()
                break
            case 5:
                await sumRepos()
                break
            case 6:
                alert('Encerrando o programa...')
                break
            default:
                alert(`Insira um valor válido!`)
        }
    }
}

// Chamada da função principal assíncrona para iniciar o programa
main();
