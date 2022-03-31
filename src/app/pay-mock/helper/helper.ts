import {InputType} from "../user";

export const checkInfo = function(review: any): ({confirm: boolean, value: string }) {
    const value = review ? review['value']: ''
    const needReview = review ? review['to-be-reviewed'] : 'no'
    if (!value) return {confirm: false, value: ''}
    if (needReview === 'no') {
        return {confirm: true, value}
    }
    else {
        return {confirm: false, value: ''}
    }
}

export const keyPress = function(event: any, type: InputType) {
    let pattern = /[0-9]/;
    if( type === InputType.number) {
        pattern = /[0-9]/;
    }
    if (type === InputType.name) {
        pattern = /^[ a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềẻẽêểểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ'`'\-]+$/
    }
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
        console.log(inputChar)
        event.preventDefault();
    }
}
