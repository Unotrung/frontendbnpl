import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Contract} from "./contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  contract: BehaviorSubject<Contract>
  constructor() {
    this.contract = new BehaviorSubject<Contract>({
      id: '1',
      content: "Đối tác được quyền thanh toán chậm cho việc mua sản phẩm trong thời hạn quy định trên Hợp đồng mua hàng hoá trả chậm. " +
          "Giá sản phẩm sẽ được thanh toán định kỳ hàng ngày thông qua Ví dưới (ví tiền mặt) của Đối tác. " +
          "Vui lòng duy trì thu nhập tại Ví dưới (ví tiền mặt) để hệ thống thực hiện thanh toán tự động, tránh việc trễ hạn và ảnh hưởng đến quyền lợi của Đối tác." +
          "Trường hợp thu nhập ví dưới không đủ vào ngày thanh toán định kỳ, khoản còn thiếu hệ thống sẽ tự động thu (từ ví dưới) vào những ngày kế tiếp, kể cả ngày lễ và cuối tuần." +
          "Thời gian khấu trừ ví dưới dự kiến sẽ bắt đầu trong..." +
          "Trường hợp thu nhập ví dưới không đủ vào ngày thanh toán định kỳ, khoản còn thiếu hệ thống sẽ tự động thu (từ ví dưới) vào những ngày kế tiếp, kể cả ngày lễ và cuối tuần." +
          "Thời gian khấu trừ ví dưới dự kiến sẽ bắt đầu trong..."
    })
  }
}
