let mundo;
const totalPlanets = [];
function planets(planet) {
    if (!planet.situacao || !planet.coordenadas.length || !planet.nome) {
        alert(`Escolha uma opção válida!`);
        return;
    }
    const planeta = {
        nome: planet.nome,
        coordenadas: planet.coordenadas,
        satelites: planet.satelites,
        situacao: planet.situacao
    };
    totalPlanets.push(planeta);
    alert(`Planeta ${planeta.nome} cadastrado com sucesso!`);
}
function createPlanet() {
    const nome = prompt('Digite o nome do planeta.');
    const coordenadas = Number(prompt('Digite as coordenadas do planeta.'));
    const situacao = prompt('Digite a situação do planeta.\n\nhabitado\nhabitável\ninabitável\ninexplorado');
    if (!nome || isNaN(coordenadas)) {
        alert(`Nome ou coordenadas inválidas.`);
    }
    const confirmation = confirm(`Confirma o registro do planeta ${nome}?\nCoordenada: ${coordenadas}`);
    if (confirmation) {
        // Verifica se a situação inserida é válida
        if (!["habitado", "habitável", "inabitável", "inexplorado"].includes(situacao)) {
            alert('Insira um valor válido!');
            return;
        }
        // Chama a função planets com os dados fornecidos
        planets({ nome, coordenadas: [coordenadas], satelites: [], situacao: situacao });
    }
}
function updateSituation(nome) {
    const findPlanet = totalPlanets.find(planeta => planeta.nome === nome);
    if (findPlanet) {
        const novaSituacao = prompt('Digite a situação do planeta.\n\nhabitado\nhabitável\ninabitável\ninexplorado');
        switch (novaSituacao) {
            case "habitado":
            case "habitável":
            case "inabitável":
            case "inexplorado":
                findPlanet.situacao = novaSituacao;
                alert(`Situação do planeta ${nome} atualizada para ${novaSituacao}.`);
                break;
            default:
                alert('Insira um valor válido!');
                return;
        }
    }
    else {
        alert(`Planeta com o nome ${nome} não encontrado!`);
    }
}
function addSateliteNoPlaneta(nome) {
    const findPlanet = totalPlanets.find(planeta => planeta.nome === nome);
    if (findPlanet) {
        const addSatelite = prompt(`Digite o nome do satélite que deseja adicionar ao planeta ${nome}.`);
        findPlanet.satelites.push(addSatelite);
        alert(`O satélite ${addSatelite} foi adicionado ao planeta ${findPlanet.nome} com sucesso!`);
    }
    else {
        alert(`Nome ${nome} não encontrado!`);
    }
}
function removeSatelite(nome) {
    const findPlanet = totalPlanets.find(planeta => planeta.nome === nome);
    if (findPlanet) {
        const removeSatelite = prompt(`Digite o nome do satélite que deseja excluír do planeta ${nome}.`);
        const i = findPlanet.satelites.findIndex(satelite => satelite === removeSatelite);
        if (i !== -1) {
            findPlanet.satelites.splice(i, 1);
            alert(`O satélite ${removeSatelite} foi excluído ao planeta ${findPlanet.nome} com sucesso!`);
        }
        else {
            alert(`Satélite ${removeSatelite} não encontrado no planeta ${findPlanet.nome}.`);
        }
    }
    else {
        alert(`Nome ${nome} não encontrado!`);
    }
}
function listarPlanetas() {
    let list = "Planetas registrados:\n";
    totalPlanets.forEach((planeta => {
        list += `
        Nome: ${planeta.nome}
        Coordenadas: ${planeta.coordenadas}
        Satélites: ${planeta.satelites}
        Situação: ${planeta.situacao}
        \n
        `;
    }));
    alert(list);
}
let userOption = 0;
while (userOption !== 6) {
    const menu = `Painel Principal
    1 - Registrar um planeta
    2 - Atualizar uma situação de um planeta
    3 - Adicionar satélite a um planeta
    4 - Excluir satélite de um planeta
    5 - Listar planetas registrados
    6 - Encerrar
  `;
    userOption = Number.parseInt(prompt(menu));
    switch (userOption) {
        case 1:
            createPlanet();
            break;
        case 2:
            const planetReference = prompt('Digite o nome do planeta que deseja atualizar uma situação.');
            updateSituation(planetReference);
            break;
        case 3:
            const addSateliteReference = prompt('Digite o nome do planeta que deseja adicionar um satélite.');
            addSateliteNoPlaneta(addSateliteReference);
            break;
        case 4:
            const removeSateliteReference = prompt('Digite o nome do planeta que deseja excluír um satélite.');
            removeSatelite(removeSateliteReference);
            break;
        case 5:
            listarPlanetas();
            break;
        default:
            alert(`Insira um valor válido!`);
    }
}
