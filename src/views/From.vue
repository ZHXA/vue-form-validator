<template>
 <div id="form">
   <!--
    model：表单控件绑定的数据对象，在校验或重置时会访问该数据对象下对应的表单数据，类型为 Object。
    rules：表单验证规则，即上面介绍的 async-validator 所使用的校验规则，类型为 Object。
   -->
   <i-from ref="form" :model='formValidate' :rules="ruleValidate">
     <!--
      label：单个表单组件的标签文本，类似原生的 <label> 元素，类型为 String。
      prop：对应表单域 Form 组件 model 里的字段，用于在校验或重置时访问表单组件绑定的数据，
     -->
     <i-from-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
     </i-from-item>
     <i-from-item label="邮箱" prop="mail">
       <i-input v-model="formValidate.mail"></i-input>
     </i-from-item>
   </i-from>
   <button @click="handleSubmit">提交</button>
   <button @click="handleReset">重置</button>
 </div>
</template>

<script>
import iFrom from '../components/form/form'
import iFromItem from '../components/form/formItem'
import iInput from './../components/input/input'
export default {
  data () {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功')
        } else {
          window.alert('表单校验失败')
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    }
  },
  components: {
    iFrom,
    iFromItem,
    iInput
  }
}
</script>

<style scoped>

</style>
