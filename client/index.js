const baseURL = 'https://simplytodos.herokuapp.com'

function hideAllnav() {
  $('#nav-home').hide()
  $('#nav-3rd').hide()
  $('#nav-logout').hide()
  $('#nav-add').hide()
}

function showAllnav() {
  $('#nav-home').show()
  $('#nav-3rd').show()
  $('#nav-logout').show()
  $('#nav-add').show()
}

function showLogin() {
  hideAllnav()
  $('#form-signUp').hide()
  $('#form-list').hide()
  $('#form-login').show()
  $('#form-modif').hide()
  $('#form-add').hide()
}

function showHome() {
  showAllnav()
  $('#form-list').show()
  $('#form-login').hide()
  $('#form-signUp').hide()
  $('#form-modif').hide()
  $('#form-add').hide()
  fetchTodos()
}

function showSignUp() {
  hideAllnav()
  $('#form-signUp').show()
  $('#form-login').hide()
  $('#form-list').hide()
  $('#form-modif').hide()
  $('#form-add').hide()
}

function showAdd() {
  showAllnav()
  $('#form-login').hide()
  $('#form-signUp').hide()
  $('#form-list').hide()
  $('#form-modif').hide()
  $('#form-add').show()
}

function showStatus() {
  showAllnav()
  $('#form-login').hide()
  $('#form-signUp').hide()
  $('#form-list').hide()
  $('#form-modif').show()
  $('#form-add').hide()
}

function changeStatus( id ) {
  event.preventDefault()
  showStatus()
  $.ajax ( {
    url: baseURL+`/todos/${id}`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem( 'access_token' )
    }
  } ).done ( modif => {
    $( '#modif-status' ).val( modif.todo.status )
    $( '#modif-id' ).val( modif.todo.id )
    // console.log ( modif, "modif" )
  }).fail ( xhr => {
    console.log ( xhr )
  } )
}

function showLogout() {
  showLogin()
}

function fetchTodos () {
  $.ajax ( {
    url: baseURL+'/todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem( 'access_token' )
    }
  } ).done ( todos => {
    // console.log(todos)
    $( '#todo-list' ).empty()
    todos.data.forEach( el => {
      $( '#todo-list' ).append( `
      <div class="container">
					<div class="row" >
							<div class="col-md-5" style="padding-bottom: 30px;">
									<div class="card card-3">
											<h3>${el.title}</h3>
												<p>${el.description}</p>
												<label>Due Date :</label>
												<p>${el.due_date.slice(0,10)}</p>
                        <div class="buttons-wrapper">
												<label>Status :</label>
												<p>${el.status} <button a href="" class="transparent-button" onclick="changeStatus(${el.id})" > change</button></a> </p>
                        <button a href="" class="orange-button" onclick="deleting(${el.id})">Delete</button></a>
                        </div> <br>
									</div>
							</div>
					</div>		
      </div>	
      ` )
    });
  } ).fail ( xhr => {
    console.log ( xhr )
  } )
}

function deleting (id) {
  $.ajax ( {
    url: baseURL+`/todos/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem( 'access_token' )
    }
  } ).done ( deleted => {
    showHome()
  } ).fail ( xhr => {
    console.log ( xhr )
  })
}

$( document ).ready( function() {

  if ( localStorage.getItem ( 'access_token' ) ) {
    showHome()
  } else {
    showLogin()
  }

  $('#nav-add').click( function( event ) {
    event.preventDefault()
    showAdd()
  } )

  $('#link-signUp').click( function( event ) {
    event.preventDefault()
    showSignUp()
  } )


  $('#nav-logout').click( function( event ) {
    event.preventDefault()
    localStorage.clear()
    showLogin()
  } )

  $('#form-login').submit( function( event ) {
    event.preventDefault()
    // console.log('adhkahkahd')
    const email = $( '#email-input' ).val() //ngambil value
    const password = $( '#password-input' ).val()
    // console.log ( email, password )

    $.ajax ( {
      url: baseURL+'/login',
      method: 'POST',
      data: {
        email, password
      }
    } ).done ( data => {
      localStorage.setItem ( 'access_token', data.access_token )
      showHome()
    } ).fail ( xhr => {
      console.log ( xhr )
    } )
  } )

  $('#form-add').submit( function( event ) {
    // console.log('adhkahkahd')
    event.preventDefault()
    const title = $( '#add-title' ).val()
    const description = $( '#add-desc' ).val()
    const status = $( '#add-status' ).val()
    const due_date = $( '#add-date' ).val()
    // console.log ( email, password )

    $.ajax ( {
      url: baseURL+'/todos',
      method: 'POST',
      headers: {
        access_token: localStorage.getItem( 'access_token' )
      },
      data: {
        title, description, status, due_date
      }
    } ).done ( adding => {
      // console.log ( adding )
      $( '#add-title' ).val('') //tetapin value
      $( '#add-desc' ).val('')
      $( '#add-status' ).val('')
      $( '#add-date' ).val('')
      showHome()
    } ).fail ( xhr => {
      console.log ( xhr )
    } )
  } )

  $('#form-signUp').submit( function( event ) {
    // console.log('adhkahkahd')
    event.preventDefault()
    const username = $( '#username' ).val()
    const email = $( '#email' ).val()
    const password = $( '#password' ).val()
    // console.log ( email, password )

    $.ajax ( {
      url: baseURL+'/register',
      method: 'POST',
      headers: {
        access_token: localStorage.getItem( 'access_token' )
      },
      data: {
        username, email, password
      }
    } ).done ( adding => {
      // console.log ( adding )
      $( '#username' ).val('')
      $( '#email' ).val('')
      $( '#password' ).val('')
      showHome()
    } ).fail ( xhr => {
      console.log ( xhr )
    } )
  } )

  $('#form-modif').submit( function( event ) {
    event.preventDefault()
    const id = $( '#modif-id' ).val()
    const status = $( '#modif-status' ).val()
    // console.log (id, stat)
    $.ajax ( {
      url: baseURL+`/todos/${id}`,
      method: 'PATCH',
      headers: {
        access_token: localStorage.getItem( 'access_token' )
      },
      data: {
        status
      }
    } ).done ( data => {
      console.log ( data, 'data stat')
      showHome()
    } ).fail ( xhr => {
      console.log ( xhr )
    } )
  } )

} )