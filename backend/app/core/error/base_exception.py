class BaseError(Exception):
    message: str = "Server Internal Error"
    code: int = 500

    def __str__(self):
        return self.message
