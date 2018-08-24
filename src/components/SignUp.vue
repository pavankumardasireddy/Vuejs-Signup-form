<template>
  <div>
    <form novalidate class="md-layout jc-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 overflow-x">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="phone">Phone Number</label>
            <md-input type="number" name="phone" id="phone" autocomplete="phone" v-model="form.phone" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.phone.required">The phone number is required</span>
            <span class="md-error" v-else-if="!$v.form.phone.maxLength">Invalid Phone Number</span>
          </md-field>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input name="password" type="password" id="password" v-model="form.password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Password should contain minimum 4 charecters </span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="cpassword">Confirm Password</label>
                <md-input name="cpassword" type="password" id="cpassword" v-model="form.cpassword" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.cpassword.required">The confirm password is required</span>
                <span class="md-error" v-else-if="!$v.form.cpassword.minlength">Confirm Password should contain minimum 4 charecters </span>
              </md-field>
            </div>
          </div>

          
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
       
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import router from '../router'
  import {
    required,
    email,
    minLength,
    maxLength,
    password
  } from 'vuelidate/lib/validators'

  export default {
    name: 'signUp',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        password: null,
        cpassword: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
         email: {
          required,
          email
        },
         phone: {
          required,
           minLength: minLength(10)
        },
        password: {
          required,
          minLength: minLength(4)
        },
        cpassword: {
          required,
          minLength: minLength(4)
        },
       
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.email = null
        this.form.phone = null
        this.form.password = null
        this.form.cpassword = null 
        window.setTimeout(() => {
          router.push({ name:"home" });
        }, 1500)
      },
      saveUser () {
        this.sending = true
        let data = {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            phone: this.form.phone,
            email: this.form.email,
            password: this.form.password
        }
        // Instead of this timeout, here you can call your API
        console.log("signup details: ",data)
        window.setTimeout(() => {
          this.lastUser = `${data.firstName} ${data.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
    .jc-center {
        justify-content: center;
    }
    .overflow-x {
        overflow-x: hidden
    }
</style>
