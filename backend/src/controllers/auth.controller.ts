import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'


const authenticateWithGoogle = catchAsync(async (req, res) => {
    res.status(httpStatus.CREATED).send({ "message": "Hello" })
})

export default {
    authenticateWithGoogle
}