import 'cypress-wait-until';

function preventFormSubmitDefault(selector) {
    cy.get(selector).then(form$ => {
        form$.on("submit", e => {
            e.preventDefault();
        });
    });
}

let i = 0

context("Variant Browser", () => {
    beforeEach(() => {
        //cy.visit("http://localhost:3000/src/#login")
    })

    it("login", () => {

/*        cy.server( {
            onRequest: () => {
                i++;
            },
            onResponse: () => {
                i--;
            }
        });*/

        /*cy.on('url:changed', url => {
            //cy.visit(url);
            console.log("URL CHANGED", url)
        });*/
        cy.visit("http://localhost:3000/src/#login")

        /*cy.route("POST", "http://bioinfo.hpc.cam.ac.uk/opencga-prod/webservices/rest/v2/!**!/!*").as("POST")
        cy.route("GET", "http://bioinfo.hpc.cam.ac.uk/opencga-prod/webservices/rest/v2/!**!/!*").as("GET")*/

        //cy.route('GET', 'http://bioinfo.hpc.cam.ac.uk/opencga-prod/webservices/rest/v2/projects/search').as('projects/search')

        cy.get("#opencgaUser").type("demouser").should("have.value", "demouser")
        cy.get("#opencgaPassword").type("demouser").should("have.value", "demouser")

        //cy.clock()

        cy.get("form#formLogin").submit()

        cy.wait(5000);

        cy.visit("http://localhost:3000/src/#home");
        cy.reload();
        cy.url().should("include", "#home")

        //cy.window().then(win => win["alert"]("HELLO!!"))

        cy.get(".subtitle").contains( "Interactive Variant Analysis")
        cy.get(".version").contains( "v2.0.0-beta")

        cy.wait(5000);
        cy.visit("http://localhost:3000/src/#browser");
        cy.reload();
        cy.url().should("include", "#browser");

        //cy.get(".page-title").contains( "Variant Browser")

        /*cy.waitUntil(() => i > 0)
        cy.waitUntil(() => i === 0)*/


        //cy.wait(["@POST", "@GET"])

        //cy.tick(10000)

        //cy.get("@POST.all").should("have.length", 1)
        //cy.get("@GET.all").should("have.length", 1)

        //cy.reload();



        //preventFormSubmitDefault("form");
        //cy.get("button[type=submit]").click()
        //cy.visit("http://localhost:3000/src/#browser")


        //cy.visit("http://localhost:3000/src/#browser")//.should("eq", "#home")
        //cy.get(".subtitle").should("have.value", "Interactive Variant Analysis")
        //cy.get("a[data-id=browser]").click({force: true})
        //cy.url().should("include", "#home")





        /*//TODO continue
        cy.get("a[data-id=browser]").click({force: true})
        cy.waitUntil(() => i > 0)
        cy.waitUntil(() => i === 0)
        cy.reload();*/

        //cy.get("button[type=submit]").click()
    })
})
