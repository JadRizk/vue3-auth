
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export const useLoginForm = () => {
    const userEmail = ref("");
    const userPassword = ref("");

    // Validation Logics
    const rules = {
        userEmail: { required, minLength: minLength(4) },
        userPassword: { required, minLength: minLength(8) },
    };

    // For testing
    // const rules = {
    //     userEmail: {},
    //     userPassword: {},
    // };

    const v = useVuelidate(rules, { userEmail, userPassword });

    const handleBlur = (key: 'userEmail' | 'userPassword') => {
        v.value[key].$touch()
    };

    function validateOnSubmit() {
        v.value.$touch()
    }

    return {
        userEmail,
        userPassword,
        handleBlur,
        validateOnSubmit,
        v,
    };
};