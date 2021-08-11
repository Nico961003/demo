<template>
  <section class="dashboard">
<div class="container">
    <div class="main-body">
      <div class="d-flex justify-content-center">
            <div class="col-md-9 mb-8">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-sm-8">
                          <h2>Acerca de Keycloak Management</h2>
                          <img src="../../assets/images/logo-egas.png" alt="Admin" width="150">
                          <p>eGas</p>
                          <br><hr>
                        </div>
                        <div class="col-sm-4">
                          <span class="glyphicon glyphicon-signal logo"></span>
                        </div>
                      </div>
                    </div>
                    <div class="container-fluid bg-grey">
                      <div class="row">
                        <div class="col-sm-4">
                          <span class="glyphicon glyphicon-globe logo"></span>
                        </div>
                        <div class="col-sm-8">
                          <h2>Keycloak Management v0.1</h2>
                          <h4>Derechos de Autor © 2021 eGas</h4>
                          <p>{{currentDate()}}</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
           </div>
  </section>
</template>

<script lang='js'>
export default {
  methods: {
    currentDate () {
      const current = new Date()
      const date = current.toLocaleString('es-MX')
      return date
    }
  }
}
</script>
