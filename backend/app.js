var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var mysql = require('mysql2')
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'arhaanb',
	database: 'medicines'
})

var app = express()

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/db', (req, res) => {
	connection.query('select * from admin;', function (err, rows) {
		if (err) throw err

		res.json(rows)
	})
})

app.get('/home', (req, res) => {
	connection.query('select * from product;', function (err, rows) {
		if (err) throw err

		res.json(rows)
	})
})

app.get('/suppliers', (req, res) => {
	connection.query('select * from supplier;', function (err, rows) {
		if (err) throw err

		res.json(rows)
	})
})

app.post('/addproduct', (req, res) => {
	const { name, supplier, description, image, price, quantity, metadata } =
		req?.body

	connection.query(
		`insert into product (name, supplier_id, price, description, quantity, metadata, img) values ("${name}", ${supplier}, ${price}, '${description}', ${quantity}, "${metadata}", "${image}");`,
		function (err, adminRows) {
			if (err) {
				console.log(err)
				return res.status(500).json({ error: err.sqlMessage })
			}

			return res.json({ hi: 'success' })
		}
	)
})

app.post('/login', (req, res) => {
	const { u, p } = req?.body

	connection.query(
		`SELECT c.*, CASE WHEN a.customer_id IS NOT NULL THEN 1 ELSE 0 END AS isAdmin FROM customer c LEFT JOIN admins a ON c.customer_id = a.customer_id WHERE c.username = '${u}';`,
		function (err, adminRows) {
			if (err) {
				console.log(err)
				res.status(500).json({ error: err.sqlMessage })
			}

			if (adminRows.length > 0) {
				const user = adminRows[0]

				if (user.password == p) {
					if (user.log_count > 3) {
						return res.status(500).json({
							error: 'Your account has been blocked. Please contact an admin.'
						})
					} else {
						connection.query(
							`UPDATE customer SET log_count = 0, blocked = 0 WHERE username = '${u}';`,
							function (err, adminRows) {
								if (err) {
									console.log(err)
									return res.status(500).json({ error: err.sqlMessage })
								}

								return res.json({
									user: user,
									type: user.isAdmin ? 'admin' : 'customer'
								})
							}
						)
					}
				} else {
					connection.query(
						`UPDATE customer SET log_count = log_count + 1 WHERE username = '${u}';`,
						function (err, adminRows) {
							if (err) {
								console.log(err)
								return res.status(500).json({ error: err.sqlMessage })
							} else if (user.log_count < 3) {
								return res.status(500).json({
									error: `Wrong password. You have ${
										3 - user.log_count
									} attempts left.`
								})
							} else {
								return res.status(500).json({
									error:
										'Your account has been blocked. Please contact an admin.'
								})
							}
						}
					)
				}
			} else {
				return res.status(500).json({ error: 'User not found' })
			}
		}
	)
})

app.get('/addtocart', (req, res) => {
	const { c_id, q, p_id } = req?.query

	connection.query(
		`INSERT INTO cart_items (cart_id, product_id, quantity) SELECT IFNULL((SELECT cart_id FROM cart WHERE customer_id = ${c_id}), (SELECT MAX(cart_id) FROM cart) + 1), ${p_id}, ${q} FROM dual ON DUPLICATE KEY UPDATE quantity = quantity + ${q};`,
		function (err, adminRows) {
			if (err) throw err

			res.json({ hi: 'yo' })
		}
	)
})

app.get('/removefromcart', (req, res) => {
	const { c_id, p_id } = req?.query

	connection.query(
		`DELETE FROM cart_items WHERE cart_id = (SELECT cart_id FROM cart WHERE customer_id = ${c_id}) AND product_id = ${p_id};`,
		function (err, adminRows) {
			if (err) throw err

			res.json({ hi: 'yo' })
		}
	)
})

app.get('/cart', (req, res) => {
	const { c } = req?.query

	connection.query(
		`SELECT p.name, p.metadata, p.price, ci.product_id, SUM(ci.quantity) AS total_quantity, p.price * SUM(ci.quantity) as total_price FROM cart c JOIN cart_items ci ON c.cart_id = ci.cart_id JOIN product p ON ci.product_id = p.product_id WHERE c.customer_id = ${c} GROUP BY ci.product_id;`,
		// `SELECT p.name, p.metadata, ci.product_id, SUM(ci.quantity) AS total_quantity FROM cart c JOIN cart_items ci ON c.cart_id = ci.cart_id JOIN product p ON ci.product_id = p.product_id WHERE c.customer_id = ${c} GROUP BY ci.product_id;`,
		function (err, adminRows) {
			if (err) throw err

			if (adminRows.length > 0) {
				res.json({ cart: adminRows })
			} else {
				res.status(404).json({ error: 'Cart not found' })
			}
		}
	)
})

app.get('/test', (req, res) => {
	connection.query(
		`(SELECT COALESCE((SELECT id FROM delivery_agent WHERE availability = 1 LIMIT 1), 0) AS id);`,
		function (err, stuff) {
			if (err) {
				console.log(err)
				return res.status(500).json({ error: err.sqlMessage })
			}

			return res.json({ stuff: stuff[0].id })
		}
	)
})

app.post('/order', (req, res) => {
	const { cart, details } = req?.body

	console.log(cart)
	connection.query(
		`update wallet set balance = balance - ${details.total_price} where customer_id = ${details.customer_id};`,
		function (err, adminRows) {
			if (err) {
				console.log(err)
				return res.status(500).json({ error: err.sqlMessage })
			}

			connection.query(
				`(SELECT COALESCE((SELECT id FROM delivery_agent WHERE availability = 1 LIMIT 1), 0) AS id);`,
				function (err, stuff) {
					if (err) {
						console.log(err)
						return res.status(500).json({ error: err.sqlMessage })
					}

					var del_id = stuff[0].id

					connection.query(
						`INSERT INTO orders (customer_id, address, delivery_agent_id, metadata, order_status, total_price) VALUES (${details.customer_id}, '${details.address}', ${del_id}, '${details.shipping}', 'in transit', ${details.total_price});`,
						function (err, adminRows) {
							if (err) throw err

							var hoo = []
							cart.forEach((i) => {
								hoo.push(
									`((select order_id from orders ORDER BY order_id DESC LIMIT 1), ${i.product_id}, ${i.total_quantity})`
								)
							})

							connection.query(
								`insert into order_products values ${hoo.join(', ')};`,
								function (err, stuff) {
									if (err) {
										console.log(err)

										connection.query(
											`DELETE FROM orders WHERE order_id = (SELECT * FROM (SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1) AS subquery);`
										)

										return res.status(500).json({ error: err.sqlMessage })
									}

									cart.forEach((i) => {
										connection.query(
											`update product set quantity = quantity - ${i.total_quantity} where product_id = ${i.product_id}`
										)
									})

									connection.query(
										`delete from cart_items where cart_id = (select cart_id from cart where customer_id = ${details.customer_id});`
									)

									return res.json({
										cart,
										details
									})
								}
							)
						}
					)
				}
			)
		}
	)
})

app.get('/admin/login', (req, res) => {
	const { u, p } = req?.query

	connection.query(
		`select * from admin where username = '${u}' and password = '${p}';`,
		function (err, adminRows) {
			if (err) throw err

			if (adminRows.length > 0) {
				res.json({ m: adminRows[0], type: 'admin' })
			} else {
				res.status(404).json({ error: 'User not found' })
			}
		}
	)
})

app.get('/signup', (req, res) => {
	if (req?.query?.q) {
		connection.query(
			`select * from product where name like '%${req?.query?.q}%';`,
			function (err, rows) {
				if (err) throw err

				res.json(rows)
			}
		)
	} else {
		res.send([])
	}
})

app.get('/wallet', (req, res) => {
	const { id } = req?.query

	connection.query(
		`select * from wallet where customer_id = ${id};`,
		function (err, rows) {
			if (err) throw err
			if (rows.length > 0) {
				return res.json({ amt: rows[0].balance })
			} else {
				connection.query(
					`insert into wallet (customer_id, balance) values (${id}, 0);;`
				)
				return res.json({ amt: 0.0 })
			}
		}
	)
})

app.get('/addtowallet', (req, res) => {
	const { amt, id } = req?.query

	connection.query(
		`select * from wallet where customer_id = ${id};`,
		function (err, rows) {
			if (err) throw err

			console.log(rows)

			// if (rows.length > 0) {
			const finalamt = parseFloat(rows[0].balance) + parseFloat(amt)
			connection.query(
				`update wallet set balance = ${finalamt} where customer_id = '${id}';`,
				function (err, rows) {
					return res.json({ amt: finalamt })
				}
			)
			// } else {
			//   connection.query(
			//     `insert into wallet (customer_id, balance) values (${id}, ${amt});`,
			//     function (err, rows) {}
			//   );
			// }
		}
	)
})

app.get('/product', (req, res) => {
	const { p } = req?.query
	console.log(p)
	if (p == 'undefined') {
		res.status(500).send('no')
	} else if (p) {
		connection.query(
			`select * from product where product_id = ${p};`,
			function (err, rows) {
				if (err) throw err

				res.json(rows[0])
			}
		)
	} else {
		res.status(500).send('no')
	}
})

app.get('/search', (req, res) => {
	if (req?.query?.q) {
		connection.query(
			`select * from product where name like '%${req?.query?.q}%';`,
			function (err, rows) {
				if (err) throw err

				res.json(rows)
			}
		)
	} else {
		res.send([])
	}
})

//admin routes

app.get('/admin/customers', (req, res) => {
	connection.query(
		'select customer_id as id, name, email, phone, address from customer;',
		function (err, rows) {
			if (err) throw err

			res.json(rows)
		}
	)
})

app.get('/admin/orders', (req, res) => {
	connection.query(
		`select o.*, c.name from orders o join customer c where o.customer_id = c.customer_id;`,
		// 'SELECT o.*, c.name, c.email, c.phone, p.name as product_name, o.metadata as delivery FROM orders o INNER JOIN customer c ON o.customer_id = c.customer_id INNER JOIN product p ON o.product_id = p.product_id;',
		// "SELECT o.*, c.name, c.email, c.phone, o.metadata as delivery FROM orders o INNER JOIN customer c ON o.customer_id = c.customer_id INNER JOIN product p ON o.product_id = p.product_id; ",
		function (err, rows) {
			if (err) throw err

			res.json(rows)
		}
	)
})

app.post('/admin/updatestatus', (req, res) => {
	const { o } = req.query
	const { status } = req.body

	connection.query(
		`update orders set order_status = "${status}" where order_id = ${o};`,
		function (err, rows) {
			if (err) throw err

			res.json({ rows: 'bro' })
		}
	)
})

app.get('/admin/getorder', (req, res) => {
	const { o } = req.query

	connection.query(
		`SELECT op.*, o.*, da.name as daname, o.order_status as status, p.name AS product_name, p.price AS product_price FROM order_products op JOIN orders o ON op.order_id = o.order_id JOIN product p ON op.product_id = p.product_id JOIN delivery_agent da  ON o.delivery_agent_id = da.id WHERE op.order_id = ${o};`,
		// 'SELECT o.*, c.name, c.email, c.phone, p.name as product_name, o.metadata as delivery FROM orders o INNER JOIN customer c ON o.customer_id = c.customer_id INNER JOIN product p ON o.product_id = p.product_id;',
		// "SELECT o.*, c.name, c.email, c.phone, o.metadata as delivery FROM orders o INNER JOIN customer c ON o.customer_id = c.customer_id INNER JOIN product p ON o.product_id = p.product_id; ",
		function (err, rows) {
			if (err) throw err

			res.json(rows)
		}
	)
})

app.use('/', indexRouter)
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
