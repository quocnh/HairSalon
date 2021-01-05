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
    public static BookingTime = [
        'Sáng',
        'Chiều',
        'Tối',
        'Tùy chọn',
    ];

    public static City = [
        [
            {name : 'Tp. Hồ Chí Minh'},
            [
                {dist: 'Huyện Bình Chánh'},
                {dist: 'Quận 1'},
			    {dist: 'Quận 10'},
			    {dist: 'Quận 11'},
			    {dist: 'Quận 12'},
			    {dist: 'Quận 2'},
			    {dist: 'Quận 3'},

            ]
        ],
        [
            {name : 'Hanoi'},
            [
                {dist: 'asdad'},
                {dist: 'Quận a'},
			    {dist: 'Quận b'},
			    {dist: 'Quận v1'},
			    {dist: 'Quận b2'},
			    {dist: 'Quận nn'},
			    {dist: 'Quận r3'},

            ]
        ]
		
    ]
}