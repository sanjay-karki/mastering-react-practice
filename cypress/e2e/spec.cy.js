describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[href="/login"]').click();

    // cy.contains('SUBU').click()
    cy.url().should("include", "/login");

    cy.get("#email").type("abc@xyz").should("have.value", "abc@xyz");

    cy.get("#password").type("123").should("have.value", "123");

    // cy.get('#password').focus()
    // cy.focused().type('123')

    // cy.get('#email').clear()

    cy.get("button").should("not.include.text", "SUBU");
    cy.get("button").should("include.text", "SUBMIT");

    cy.get("button")
      .should("have.class", "submit-btn")
      .should("have.css", "border-radius")
      .and('match', /8p/);
      // .and('eq', '8px');

    // cy.get('button').contains('.submit-btn', 'SUBMIT').click()

    // cy.get('button').contains('.submit-btn', 'submit', {matchCase: false}).click()
    cy.get('button').contains('.submit-btn', 'submit', {matchCase: false}).as('meroBtn')
    cy.get('@meroBtn').click() // using alias

    // cy.get('p').contains('welcome admin!', {matchCase: false})
    cy.get('[href="/information"]').click()
    // cy.wait(5000)
    // cy.get('[href="/"]' ).click()

    cy.contains("Email")

    const fn = () => {
      return "bar";
    };
    cy.wrap({ foo: fn }).invoke("foo").should("eq", "bar"); // true
    
    cy.wrap({ nana: "papa" })
      .should("have.property", "nana")
      .and("equal", "papa");
    
    cy.wrap({ age: 99 }).its("age").should("eq", 99);
    // cy.wait(5000)
    // cy.reload()

  });
});
