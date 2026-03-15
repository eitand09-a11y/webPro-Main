
const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBth = document.getElementById('login')

registerBtn.addEventListener('click',()=>{
    container.classList.add("active")
})

loginBth.addEventListener('click',()=>{
    container.classList.remove("active")
})


async function singUp(event) {
    event.preventDefault();
    let username = event.target.userName.value;
    let email = event.target.userEmail.value;
    let password = event.target.userPassword.value;
    try {
        const response = await axios.post("http://localhost:5500/users",
           { username, email, password });
           
        if (response.data !== undefined) {
          console.log("sing up successful");
        }
      } catch (error) {
        console.error("Error fetching, " + error);
      }
    
}

async function signIn(event) {
  event.preventDefault();
  let email = event.target.userEmail.value;
  let password = event.target.userPassword.value;
  try {
    const response = await axios.post("http://localhost:5500/users/sign-in",
     { email, password });
     
    if (response.data !== undefined) {
      console.log("Sign in successful");
      // תיקון הנתיב לפי ההיררכיה שבתמונה
      window.location.href = 'http://localhost:5500/src/home-page/home-page.html';
      // Perform actions after successful sign-in, such as redirecting to a new page or updating UI.
    }
  } catch (error) {
    console.error("Error signing in: " + error);
    // Handle sign-in error, such as displaying an error message to the user.
  }
}
  


