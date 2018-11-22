const CHECK_LIST = {
    user: [
        { property: 'id', reg: /^(?=.*).{5,12}$/, message: 'INVALID_ID' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9~!@#$%^&*]{8,16}$/, message: 'INVALID_PASSWORD' }
    ],
    comment: [
        { property: 'comment', reg: /^(?=.*).+$/m, message: 'INVALID_COMMENT' }
    ]
}

module.exports = {
    checkProperty: (data, service, strict) => {
        let result = {}
        for (const item of CHECK_LIST[service]) {
            if (data[item.property] && item.reg.exec(data[item.property])) {
                result[item.property] = data[item.property]
            } else {
                if (!strict && !data[item.property]) continue
                return { message: item.message, data: null }
            }
        }
        return { message: 'SUCCESS', data: result }
    }
}