# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|stiring|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

- belong_to :user
- belong_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

- has_meny :users, through: :members
- has_many :members
- has_many :messages

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false index: true|
|group_id|references|null: false, foreign_key: true|

- has_many :messages
- has_many :groups, through: :members
- has_many :members



