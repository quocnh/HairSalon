export class GlobalConstants {
    public static ProductCategory = [
        {value: 'duỗi'},
        {value: 'uốn'},
        {value: 'nhuộm'},
        {value: 'gội'},
        {value: 'tạo kiểu'},
        {value: 'tinh dầu'}
    ];
    public static ProductUnit = [
        {value: 'bộ'},
        {value: 'chai'},
        {value: 'hũ'},
        {value: 'tuýp'},
        {value: 'túi'}                                        
    ];

    public static OrderStatus = [
        'Đang xử lý',
        'Đang vận chuyển',
        'Hoàn thành',
        'Hủy',
    ];

    public static BookingStatus = [
        'Đang xử lý',
        'Đã xác nhận',
        'Hoàn thành',
        'Hủy',
    ];
    public static ApplicationRequestStatus = [
        'Đang xử lý',
        'Chấp nhận',
        'Từ chối',        
    ];
    public static BookingTime = [
        'Sáng',
        'Chiều',
        'Tối',
        'Tùy chọn',
    ];

    public static Genders = [
        'Nam',
        'Nữ',
        'Khác'
    ];

    public static PaymentTypes = [
        'Tiền mặt',
        'Chuyển khoản'
    ];
}