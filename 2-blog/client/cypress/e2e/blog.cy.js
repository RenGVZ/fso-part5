describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000")
    cy.request("POST", "/api/testing/reset")
    const user = {
      name: "Rob Zipco",
      username: "robbyzip",
      password: "secr3t",
    }
    cy.request("POST", "/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.get("[data-cy='login-form']").should("be.visible")
  })

  describe("Login", function () {
    it("succeeds with the correct credentials", function () {
      cy.get("input[name='username']").type("robbyzip")
      cy.get("input[name='password']").type("secr3t")
      cy.get("[data-cy='login-btn']").click()

      cy.contains("Logged in as robbyzip")
      cy.get("[data-cy='logout-btn']").click()
    })

    it("fails with incorect credentials", function () {
      cy.get("input[name='username']").type("bubba")
      cy.get("input[name='password']").type("Gump")
      cy.get("[data-cy='login-btn']").click()
      cy.contains("invalid username or password")
      cy.get("[data-cy='error-notification']").should(
        "have.css",
        "background",
        "rgb(248, 106, 106) none repeat scroll 0% 0% / auto padding-box border-box"
      )
    })
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("input[name='username']").type("robbyzip")
      cy.get("input[name='password']").type("secr3t")
      cy.get("[data-cy='login-btn']").click()
    })
    it("a blog can be created", function () {
      cy.contains("new note").click()
      cy.get("input[name='title']").type("New note")
      cy.get("input[name='author']").type("Rowan Williams")
      cy.get("input[name='url']").type("www.nope.io")
      cy.get("[data-cy='create-btn']").click()
      cy.contains("Rowan Williams")
    })

    it("a blog can be liked", function () {
      cy.contains("new note").click()
      cy.get("input[name='title']").type("Testserr")
      cy.get("input[name='author']").type("Ga Gav")
      cy.get("input[name='url']").type("ww.gogogadget.go")
      cy.get("[data-cy='create-btn']").click()
      cy.contains("view").click()
      cy.get("[data-cy='like-btn']").click()
      cy.get("[data-testid='likes']").contains("likes: 1")
    })

    it("a blog can be deleted", function () {
      cy.contains("new note").click()
      cy.get("input[name='title']").type("Testserr")
      cy.get("input[name='author']").type("Ga Gav")
      cy.get("input[name='url']").type("ww.gogogadget.go")
      cy.get("[data-cy='create-btn']").click()
      cy.contains("view").click()
      cy.get("[data-cy='delete-btn']").click()
      cy.wait(5000)
      cy.get("html").should("not.contain", "Testserr")
    })
  })

  describe("only the creator of a blog can delete it", function () {
    it("user 1 creates a blog", function () {
      // user1 logs in and creates a blog
      cy.get("input[name='username']").type("robbyzip")
      cy.get("input[name='password']").type("secr3t")
      cy.get("[data-cy='login-btn']").click()
      cy.contains("new note").click()
      cy.get("input[name='title']").type("New note")
      cy.get("input[name='author']").type("Rowan Williams")
      cy.get("input[name='url']").type("www.nope.io")
      cy.get("[data-cy='create-btn']").click()
      cy.contains("Rowan Williams")
      // user1 logs out
      cy.get("[data-cy='logout-btn']").click()
      // user2 is created and logs in
      const user2 = {
        name: "Daryl",
        username: "dryand",
        password: "secr3t",
      }
      cy.request("POST", "/api/users", user2)
      cy.visit("http://localhost:3000")
      cy.get("input[name='username']").type("dryand")
      cy.get("input[name='password']").type("secr3t")
      cy.get("[data-cy='login-btn']").click()
      // user2 creates a new note
      cy.contains("new note").click()
      cy.get("input[name='title']").type("Suppah Bad")
      cy.get("input[name='author']").type("Jonah Hill")
      cy.get("input[name='url']").type("www.supahbyadd.io")
      cy.get("[data-cy='create-btn']").click()
      // open each note and check for remove btn
      cy.get("[data-cy='blog-www.nope.io']").as("note1")
      cy.get("@note1").contains("view").click()
      cy.get("@note1").should("not.contain", "remove")

      cy.get("[data-cy='blog-www.supahbyadd.io']").as("note2")
      cy.get("@note2").contains("view").click()
      cy.get("@note2").should("contain", "remove")
    })
  })

  describe.only("checks blogs sorted by likes", function () {
    it("creates blogs to test", function () {
      cy.login({ username: "robbyzip", password: "secr3t" })
      cy.contains("new note").click()
      cy.createBlog({
        title: "Suppah Bad",
        author: "Jonah Hill",
        url: "www.supahbyadd.io",
      })
      cy.contains("new note").click()
      cy.createBlog({
        title: "Rommy Rome",
        author: "Ye",
        url: "ww.wwjrmrmrth.co",
      })
      cy.get(".blog-div").eq(0).as("firstBlog")
      cy.get("@firstBlog").contains("view").click()
      cy.get("@firstBlog").contains("Like").click()

      cy.get(".blog-div").eq(1).as("secondBlog")
      cy.get("@secondBlog").contains("view").click()
      cy.get("@secondBlog").contains("Like").click()
      cy.get("@secondBlog").contains("Like").click()

      cy.get(".blog-div").eq(0).should("contain", "Rommy Rome")
    })
  })
})
