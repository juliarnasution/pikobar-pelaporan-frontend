export const ResponseRequest = {
  TIMEOUT: 'ECONNABORTED',
  NETWORKERROR: 'Network Error',
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  UNPROCESSABLE: 422,
  SERVERERROR: 500
}

export function baseUrl() {
  let url = `${window.location.hostname}`
  if (window.location.port.length > 0) {
    url += `:${window.location.port}`
  }
  return url
}

export function listYear() {
  var currentYear = new Date().getFullYear()
  const list = []
  for (var y = 0; y < 80; y++) {
    list.push(currentYear)
    currentYear--
  }
  return list
}

export function listDays() {
  const listDay = []
  for (let d = 1; d <= 32; d++) {
    listDay.push(d)
  }
  return listDay
}

export const optionGejala = [
  {
    value: 'Suhu tubuh > 38,5',
    text: 'Suhu tubuh > 38,5'
  },
  {
    value: 'Batuk',
    text: 'Batuk'
  },
  {
    value: 'Flu',
    text: 'Flu'
  },
  {
    value: 'Demam',
    text: 'Demam'
  },
  {
    value: 'Sakit Tenggorokan',
    text: 'Sakit Tenggorokan'
  },
  {
    value: 'Sakit Kepala',
    text: 'Sakit Kepala'
  },
  {
    value: 'Sesak Napas',
    text: 'Sesak Napas'
  },
  {
    value: 'Menggigil',
    text: 'Menggigil'
  },
  {
    value: 'Lemah (malaise)',
    text: 'Lemah (malaise)'
  },
  {
    value: 'Nyeri Otot',
    text: 'Nyeri Otot'
  },
  {
    value: 'Mual atau muntah',
    text: 'Mual atau muntah'
  },
  {
    value: 'Nyeri Abdomen',
    text: 'Nyeri Abdomen'
  },
  {
    value: 'Diare',
    text: 'Diare'
  },
  {
    value: 'Lainnya',
    text: 'Lainnya'
  }
]

export const listMonthName = [
  {
    value: 1,
    text: 'Januari'
  },
  {
    value: 2,
    text: 'Februari'
  },
  {
    value: 3,
    text: 'Maret'
  },
  {
    value: 4,
    text: 'April'
  },
  {
    value: 5,
    text: 'Mei'
  },
  {
    value: 6,
    text: 'Juni'
  },
  {
    value: 7,
    text: 'Juli'
  },
  {
    value: 8,
    text: 'Augustus'
  },
  {
    value: 9,
    text: 'September'
  },
  {
    value: 10,
    text: 'Oktober'
  },
  {
    value: 11,
    text: 'November'
  },
  {
    value: 12,
    text: 'Desember'
  }
]
