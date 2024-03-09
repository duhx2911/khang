import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import CreateButton from "../Components/Account/CreateButton";
import ModalCreateNewAccount from "../Components/Account/CreateNewAccount/ModalCreateNewAccount";
import ResultForm from "../Components/Account/ResultForm";

function AccountContainer(props) {
  // Khai báo State để quản lý trạng thái đóng mở của ModalCreateNewAccount(InputForm)
  let [showForm, setShowForm] = useState(false);
  // Khai báo State để quản lý danh sách Account trên hệ thống
  let [listAccount, setListAccount] = useState([]);

  // Hàm Callback xử lý khi nhấn nút CreateNewAccount
  let onHandleCreateButtuon = () => {
    // console.log("click!!");
    setShowForm(true);
  };
  // Hàm Callback xử lý khi nhấn nút Close ở ModalCreateNewAccount
  let onHandleCloseModal = () => {
    // console.log("click!!");
    setShowForm(false);
  };
  // Hàm Callback xử lý khi nhấn nút Create ở InputForm
  let onHandleCreateNewAccount = (accountNew) => {
    // console.log("accountNew: ", accountNew);
    listAccount.push(accountNew);
    // Set lại state listAccount
    setListAccount(listAccount);
    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("listAccount", JSON.stringify(listAccount));
    // Thực hiện đóng Form sau khi thêm mới
    setShowForm(false);
  };
  // Xóa người dùng bằng id
  let onHandleDelete = (id) => {
    if (window.confirm("Bạn có muốn xóa")) {
      let newListAccount = listAccount.filter((item) => item.id !== id);
      console.log(newListAccount);
      setListAccount(newListAccount);
      localStorage.setItem("listAccount", JSON.stringify(newListAccount));
    }
  };

  // Sửa thông tin người dùng
  let onHandleUpdate = (user) => {};
  let onHandleOpenUpdate = (user) => {
    console.log(user);
    setShowForm(true);
  };

  // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listAccount thay đổi
  useEffect(() => {
    if (localStorage && localStorage.getItem("listAccount")) {
      let listAccount_LocalStorage = JSON.parse(
        localStorage.getItem("listAccount")
      );
      // console.log("listAccount_LocalStorage: ", listAccount_LocalStorage);
      setListAccount(listAccount_LocalStorage);
    }
  }, []);

  return (
    <Container>
      {/* Nút thêm mới */}
      <CreateButton onHandleCreateButtuon={onHandleCreateButtuon} />
      {/* Form thêm mới Account*/}
      <ModalCreateNewAccount
        showForm={showForm}
        onHandleCloseModal={onHandleCloseModal}
        onHandleCreateNewAccount={onHandleCreateNewAccount}
      />
      {/* Form kết quả */}
      <ResultForm
        listAccount={listAccount}
        onHandleDelete={onHandleDelete}
        onHandleOpenUpdate={onHandleOpenUpdate}
      />
    </Container>
  );
}

export default AccountContainer;
