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