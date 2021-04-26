import { assert } from 'chai';
import { setDefaultTimeout, AfterAll } from "@cucumber/cucumber";
import { binding, given, then, when } from 'cucumber-tsflow';
import puppeteer, { ElementHandle } from 'puppeteer'

setDefaultTimeout(60 * 1000);

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const startBrowser = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
}

@binding()
export class UsuariosSteps {

    @given(/Que estou na tela inicial/)
    public async dadoQueEstouNaTelaInicial() {
        await startBrowser();

        await page.goto('https://automacaocombatista.herokuapp.com/treinamento/home', { waitUntil: 'domcontentloaded' })
    }

    @when(/Acesso Criar Usuários/)
    public async quandoAcessoCriarUsuários() {
        var formularioMenu = await page.$$('.collapsible-header') as ElementHandle[];
        await formularioMenu[0].click();

        var criarUsuariosMenu = await page.$$('.collapsible-body a') as ElementHandle[];

        await Promise.all([
            criarUsuariosMenu[0].click(),
            page.waitForNavigation({ waitUntil: 'domcontentloaded' })
        ])
    }

    @then(/Visualizo o formulário de cadastro de usuários/)
    public async entaoVisualizoOFormularioDeCadastroDeUsuarios() {
        var atual = await page.url();
        var esperado = 'https://automacaocombatista.herokuapp.com/users/new';
        assert.equal(atual, esperado);
    }
}

AfterAll(async function () {
    await browser.close();
})